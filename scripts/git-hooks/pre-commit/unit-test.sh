#!/usr/bin/env bash
#
# Запускаем unit-тесты перед коммитом

# Подключаем функции-помощники
. "$(dirname $0)/utils.sh"

npm --loglevel=silent test

if [ $? == 1 ]; then
    print_fail "Unit-тесты провалены!"
    exit 1
fi

print_ok "Unit-тесты прошли успешно"
exit 0
