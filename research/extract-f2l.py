from html.parser import HTMLParser
import json,re,html
s=open('research/f2l-page.html',encoding='utf8').read()
decoded='\n'.join(json.loads(m) for m in re.findall(r'self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)',s))
matches=re.findall(r'"alg":"([^"]+)","surface":"card","set":"f2l","caseId":"([^"]+)"',decoded)
seen={}
for alg,id in matches: seen[id]=alg
assert len(seen)==41,len(seen)
data=[dict(number=i+1,alg=alg,source='https://cubeathon.com/algorithms/f2l#'+id,sourceId=id) for i,(id,alg) in enumerate(seen.items())]
open('research/f2l-cases.json','w',encoding='utf8').write(json.dumps(data,ensure_ascii=False,indent=2))
print(json.dumps(data,ensure_ascii=False,indent=2))
