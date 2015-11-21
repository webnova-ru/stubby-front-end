#!/usr/bin/env bash
#
# Запускаем валидацию всех файлов которые мы хотим закоммитить

# Подключаем функции-помощники
. "$(dirname $0)/utils.sh"

echo $(get_commit_files) | gulp validate --silent

if [ $? == 1 ]; then
    print_fail "Ваш код не валиден! Сделать коммит нельзя!"
    exit 1
fi

exit 0
