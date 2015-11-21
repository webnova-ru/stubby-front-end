#!/usr/bin/env bash
#
# Запрещает пушить с форсом в ветки master, dev и др.

# Подключаем функции-помощники
. "$(dirname $0)/utils.sh"

protected_branches="^(master|develop|dev|release-*|patch-*)"
current_branch=$(get_curr_branch)
push_command=$INVOKED_COMMAND
force_push="force|delete|\-f|\+"

if [[ "$current_branch" =~ $protected_branches && "$push_command" =~ $force_push ]]; then
  print_fail "Запрещено пушить с форсом в ветку '$_COLOR_YELLOW$current_branch$_COLOR_DEFAULT'!"
  exit 1
fi

exit 0
