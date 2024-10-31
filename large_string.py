string1="Hackerrank is an good Computer Coding Website "
string2="It offers several topics"
count1=0
count2=0

for i in string1:
	count1=count1+1
for j in string2:
	count2=count2+1

if(count1<count2):
	print("Larger string is:")
	print(string2)

elif(count1==count2):
	print("Both strings are equal.")

else:
	print("Larger string is:")
	print(string1)
