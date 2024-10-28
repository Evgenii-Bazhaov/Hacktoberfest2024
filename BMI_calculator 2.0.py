# Write a program that interprets the Body Mass Index (BMI) based on a user's weight and height.

# It should tell them the interpretation of their BMI based on the BMI value.

# Under 18.5 they are underweight
# Equal to or over 18.5 but below 25 they have a normal weight
# Equal to or over 25 but below 30 they are slightly overweight
# Equal to or over 30 but below 35 they are obese
# Equal to or over 35 they are clinically obese.

print("BMI Calculator!\n")
height = float(input("Height in m : "))
weight = float(input("Weight in kg : "))
bmi = weight / height ** 2
bmi = round(bmi,2)
if bmi < 18.5 :
  print(f"Your BMI is {bmi} and your are underweight")
elif 25 > bmi >= 18.5 :
  print(f"Your BMI is {bmi} and your are normalweight")
elif 30 > bmi >= 25 :
  print(f"Your BMI is {bmi} and your are slightly overweight")
elif 35 > bmi >= 30 :
  print(f"Your BMI is {bmi} and your are obese")
else:
  print(f"Your BMI is {bmi} and your are clinically obese")
