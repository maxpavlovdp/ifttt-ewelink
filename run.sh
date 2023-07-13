cd "$(dirname "$0")" || exit

npm i
git pull -f
node ./main.js >> log.txt