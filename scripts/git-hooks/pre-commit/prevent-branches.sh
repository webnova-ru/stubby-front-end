#!/usr/bin/env bash
#
# Запрещаем коммитить в ветки master, dev, develop

# Подключаем функции-помощники
. "$(dirname $0)/utils.sh"

protected_branches="^(master|develop|dev)"
curr_branch=$(get_curr_branch)

if [[ $curr_branch =~ $protected_branches ]]; then
  print_fail "Нельзя просто так взять и закомитить в ветку '$_COLOR_YELLOW$curr_branch$_COLOR_DEFAULT'"
  exit 1
fi

exit 0
