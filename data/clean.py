import jsonlines
import html2text

with jsonlines.open('cleaned.jsonl', mode='w') as writer:
    with jsonlines.open('output.jsonl') as reader:
      for obj in reader:
        obj["description"] = html2text.html2text(obj["descriptionHtml"] or "").strip()
        obj["answer"] = html2text.html2text(obj["answerHtml"] or "").strip()
        del obj["descriptionHtml"]
        del obj["answerHtml"]
        writer.write(obj)
