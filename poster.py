import argparse as ap
import os

args = ap.ArgumentParser()
args.add_argument("--n", type=str, help = "Post title")
args.add_argument("--f", type = str, help = "filename")
args.add_argument("--i", type = str, help ="your id")
args.add_argument("--c", type = str, help = "cors", default = "https://cors.root.workers.dev")
opt = args.parse_args()

fr = opt.n+"/n"+open(opt.f, "r").read()
print("Got file")
# print(fr'{fr}')
# os.system(f"hs=fr'{fr}'; echo $hs")
os.system(f""" node runner.js --id="{opt.i}" --name="{opt.n}" --content=fr'{fr}' --cors="https://cors.root.workers.dev" """)
# print(f"""runner.js --id="{opt.i}" --name="{opt.n}" --content={fr} --cors="{opt.c}" """)

print("Posted")
#os.system(f"""runner.js --id={opt.i} --name={opt.n} --content={fr} --cors=opt.c""")

