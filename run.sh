cd "$(dirname "$0")" || exit

npm i
git pull
node ./main.js