#!/usr/bin/env sh
set -o errexit -o nounset -o pipefail;
cd "$(dirname "$0")";

webextension_dir='webextension';

for size in 16 48 96 128;
do
    printf 'Building icon of size %s...\n' "$size";
    convert icon.svg -resize "${size}x${size}" "${webextension_dir}/assets/icons/${size}.png";
done;
