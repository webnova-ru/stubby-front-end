#!/usr/bin/env bash
#
# Запрещаем коммитить если в файлах есть следы от мержа

# Подключаем функции-помощники
. "$(dirname $0)/utils.sh"

merge_files=""

for file in $(get_commit_files); do
    if egrep -rls "^<<<<<<< |^>>>>>>> $" $file > /dev/null; then
        merge_files="$merge_files\n $_COLOR_MAGENTA$file$_COLOR_DEFAULT"
    fi
done

if [ ! -z "$merge_files" ]; then
    print_fail "Следы от мержа остались в файлах: $merge_files"
    exit 1
fi

exit 0
