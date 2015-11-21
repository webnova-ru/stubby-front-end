#!/usr/bin/env bash
#
# Подкачаем через npm и/или bower новые модули, если они появились, после мержа ветки

# Список измененных файлов
changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

check_file() {
    echo "$changed_files" | grep --quiet "$1" && eval "$2"
}

# 'npm install && npm prune', если package.json был изменён
check_file "package.json" "npm install && npm prune"

# 'bower install && bower prune', если bower.json был изменен
check_file "bower.json" "bower install && bower prune"

unset check_file
