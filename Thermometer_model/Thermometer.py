temp_type=input("Enter 'C' for Celsius and 'F' for Fahrenheit")
temp=input("Enter temperature value")
temp=float(temp)

if temp_type=="F":
    if temp > 105.8:
        print("Hyperthermia")
    elif temp > 102.4:
        print("High-grade Fever")    
    elif temp > 100.6:
        print("Moderate-grade Fever") 
    elif temp >  99.1:
        print("Low-grade Fever")
    else:
        print("You are alright Fever")
elif temp_type=="C":
    if temp > 41:
        print("Hyperthermia ")
    elif temp > 39.1:
        print("High-grade Fever")    
    elif temp > 38.1:
        print("Moderate-grade Fever") 
    elif temp >  37.3:
        print("Low-grade Fever")
    else:
        print("You are alright")
                       
