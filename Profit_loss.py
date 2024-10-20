cp=int(input("Enter cost price:"))
sp=int(input("Enter selling price:"))

if sp>cp:
    print("Profit",sp-cp)
elif cp>sp:
    print("Loss",cp-sp)  
else:
    print("No Profit No Loss")

