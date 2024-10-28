letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
symbols =  ['*', '?', '&', '^', '%','@','$',"#"]
numbers =  ['1','2','3','4','5','6','7','8','9','0']

print("Welcome to the Password generator!")
no_of_letters = int(input("How many letters would you like to have in your password\n"))
no_of_symbols = int(input("How many symbols would you like\n"))
no_of_numbers = int(input("How many numbers would you like\n"))
import random
password = ""
for letter in range(1, no_of_letters +1):
  rand_letter = random.choice(letters)
  password += rand_letter
for symbol in range(1,no_of_symbols +1):
  rand_symbol = random.choice(symbols)
  password += rand_symbol
for number in range(1, no_of_numbers +1):
  rand_number = random.choice(numbers)
  password += rand_number
# shuffle the password by converting into list
password_as_list = list(password)
random.shuffle(password_as_list)
password = "".join(password_as_list)

print("Here's your password")
print(password)