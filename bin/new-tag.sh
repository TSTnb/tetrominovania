#!/usr/bin/env bash

function error_trap()
{
    local line;
    line="$1";
    shift;
    printf 'Error on line %s!\n' "$line";
    return 1;
}

trap 'error_trap "$LINENO"' ERR;

set -o errexit -o nounset -o pipefail;

cd "$(
  dirname "$0";
)"/..;

function tag_from_pieces() {
    local base_tag="$1" patch new_tag;
    shift;

    new_tag="$base_tag";
    if (( $# > 0 ));
    then
        patch="$1";
        shift;

        if [[ -n "$patch" ]];
        then
            new_tag+=."${patch}";
        fi;
    fi;

    echo "$new_tag";
}

function tag_available() {
    ! git show-ref --quiet "$(
        tag_from_pieces "$@";
    )";
}

function new_tag() {
    local base_tag patch='' new_tag;
    base_tag="$(
        date +'%Y.%m.%d' |
            sed 's/\(\.\)0\+/\1/g';
    )";
    new_tag="$base_tag";

    while ! tag_available "$base_tag" "$patch";
    do
        (( patch++ ));
    done;

    new_tag="$(
      tag_from_pieces "$base_tag" "$patch";
    )";

    echo "$new_tag";
}

new_tag="$(
  new_tag;
)";

echo "New tag is ${new_tag}";

sed_pattern="$(
  <<SED_PATTERN cat;
s/^\(\s*"version":\s*"\).*\(",\?\)$/\1$new_tag\2/g
SED_PATTERN
)";

sed -i "$sed_pattern" ./webextension/manifest.json;

git add -p ./webextension/manifest.json;

commit_message="";

git commit -m "${new_tag} release";
git tag "$new_tag";
