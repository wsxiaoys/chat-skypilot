download() {
for i in $(cat urls.txt); do
  curl $i >> output.jsonl
  echo "" >> output.jsonl
done
}

clean() {
  python clean.py
}

#download
clean
