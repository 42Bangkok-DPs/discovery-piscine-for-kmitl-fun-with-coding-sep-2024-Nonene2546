
if [ $# -eq 0 ]; then
  echo "No arguments provided. Please provide folder names."
  exit 1
fi

for arg in "$@"; do
  mkdir "ex$arg"
done