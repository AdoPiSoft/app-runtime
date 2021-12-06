import sys, subprocess, json

args = sys.argv[1:]
chain_len = int(args[0])
offset = int(args[1])
process = subprocess.Popen(['iptables', '-L', 'FORWARD', '-xvn'],
                     stdout=subprocess.PIPE,
                     stderr=subprocess.PIPE)
stdout, stderr = process.communicate()
stats = stdout.splitlines()

def format_line(s):
  s = s.strip()
  return ' '.join(s.split()).split(" ")

stats = map(lambda s: format_line(s), stats)

stats = filter(lambda l: len(l) > 1, stats)
stats = stats[offset+2:len(stats)]

result = {}
for i in range(0, chain_len*2, 2):
  if len(stats)-1 <= i:
    break

  up = stats[i]
  down = stats[i+1]
  if not up:
    continue

  if up[2].upper() != 'ACCEPT':
    continue
  if len(up) < 10:
    continue

  result[up[10]] = { "ip_address": down[8], "upload_bytes": up[1], "download_bytes": down[1]}

print json.dumps(result)
