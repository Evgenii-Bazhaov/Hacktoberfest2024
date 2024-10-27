logo = """
     _____________________
    |  _________________  |
    | | Python       0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|

     (Regular Calculator)
"""

def add(n1,n2):
  return n1 + n2

def sub(n1,n2):
  return n1 - n2

def multiply(n1,n2):
  return n1 * n2

def divide(n1,n2):
  return n1 / n2

def calculator():

  print(logo)
  num1 = float(input("Whats the first number "))

  should_continue = True
  while should_continue :

    operations = {"+" : add,
                  "-" : sub,
                  "*" : multiply,
                  "/" : divide}
    for symbol in operations:
      print(symbol)
    opr = input("Pick an Operator ")
    num2 = float(input("Whats the next number "))
    result = operations[opr](num1,num2)
    print(f"{num1} {opr} {num2} = {result}")
    while True:
      choice = input(f"type 'y' to continue with {result} or type 'n' to start new ").lower()
      if choice == "y":
        num1 = result
        break
      elif choice == "n":
        should_continue = False
        calculator()
      else :
        print("Typo Mistake! ")


calculator()