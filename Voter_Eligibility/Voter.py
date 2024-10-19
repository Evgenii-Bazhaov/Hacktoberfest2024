age=int(input("Enter your age:"))
is_citizen=input("Enter 'Y' if you are citizen of this country.")

if age>=18 and is_citizen=="Y":
    print("You are eligible to vote.") 
else:
    print("You are not eligible to vote.")