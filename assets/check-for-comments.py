import os
import sys

rootdir=('./src')

totalfiles = 0
filesWithComment = 0

flag = True

for folder, dirs, files in os.walk(rootdir):
    for file in files:
        if file.endswith('.tsx'):
            flag = True
            fullpath = os.path.join(folder, file)
            totalfiles+= 1
            with open(fullpath, 'r', encoding='utf8') as f:
                for line in f:
                    if "// Vidur Ratna 1309874" in line:
                        # print(fullpath)
                        filesWithComment+=1
                        flag = False
                        break
                if flag:
                    print(fullpath)


print("")
print(filesWithComment , "/" , totalfiles)

if(filesWithComment != totalfiles):
    print("FAIL: Found files that do not contain 'Vidur Ratna 1309874' as a comment", file=sys.stderr)
else:
    print("PASS")
