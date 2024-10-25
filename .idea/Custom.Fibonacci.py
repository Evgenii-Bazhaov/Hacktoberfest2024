#gets input
initial = int(input("give me the first number of this custom fibonacci sequence: "))
second = int(input("give me the second number of this custom fibonacci sequence: "))

length = int(input("give me the length of the visible fibonacci sequence (includes first two digits): "))

#initializes variables needed to print the custom fibonacci sequence
fibonacci_buffer = [initial, second]
fibonacci = ""
#gets all the values for the fibonacci sequence
for i in range(length-2):
    fibonacci_buffer.append(initial+second)
    initial=fibonacci_buffer[-2]
    second=fibonacci_buffer[-1]
#stores those values into the variable fibonacci with more readable outputs
for num in fibonacci_buffer:
    fibonacci += str(num)+","
    
#prints fibonacci sequence
print(fibonacci+"...")
