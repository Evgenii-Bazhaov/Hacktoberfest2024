def calorie_calculator():
    print("Welcome to the Calorie Calculator!")
    
    # Get user's basic details
    gender = input("Enter your gender (male/female): ").lower()
    age = int(input("Enter your age (in years): "))
    weight = float(input("Enter your weight (in kilograms): "))
    height = float(input("Enter your height (in centimeters): "))

    # Get user's activity level
    print("\nSelect your activity level:")
    print("1. Sedentary (little or no exercise)")
    print("2. Lightly active (light exercise/sports 1-3 days/week)")
    print("3. Moderately active (moderate exercise/sports 3-5 days/week)")
    print("4. Very active (hard exercise/sports 6-7 days a week)")
    print("5. Super active (very hard exercise/physical job or training twice a day)")
    
    activity_level = int(input("Enter the number corresponding to your activity level: "))

    # Calculate BMR (Basal Metabolic Rate) based on gender
    if gender == 'male':
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    elif gender == 'female':
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    else:
        print("Invalid gender input. Please restart the program.")
        return

    # Adjust BMR based on activity level
    if activity_level == 1:
        daily_calories = bmr * 1.2
    elif activity_level == 2:
        daily_calories = bmr * 1.375
    elif activity_level == 3:
        daily_calories = bmr * 1.55
    elif activity_level == 4:
        daily_calories = bmr * 1.725
    elif activity_level == 5:
        daily_calories = bmr * 1.9
    else:
        print("Invalid activity level. Please restart the program.")
        return

    # Print the result
    print(f"\nYour Basal Metabolic Rate (BMR) is: {bmr:.2f} calories/day.")
    print(f"To maintain your weight with your current activity level, you need approximately {daily_calories:.2f} calories per day.")

# Start the Calorie Calculator
calorie_calculator()
