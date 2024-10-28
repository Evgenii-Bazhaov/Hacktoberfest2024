from googletrans import Translator

# Initialize the translator
translator = Translator()

# Dictionary of language codes and names
language_codes = {
    "bn": "Bangla",
    "en": "English",
    "ko": "Korean",
    "fr": "French",
    "de": "German",
    "he": "Hebrew",
    "hi": "Hindi",
    "it": "Italian",
    "ja": "Japanese",
    "la": "Latin",
    "ms": "Malay",
    "ne": "Nepali",
    "ru": "Russian",
    "ar": "Arabic",
    "zh": "Chinese",
    "es": "Spanish"
}

# Function to display language options
def display_language_options():
    print("Code : Language")
    for code, name in language_codes.items():
        print(f"{code} => {name}")
    print()

# Function to get a valid language code from the user
def get_language_code():
    while True:
        user_code = input("Please input desired language code. Enter 'options' to see the list: ").strip()
        
        if user_code == "options":
            display_language_options()
        elif user_code in language_codes:
            print(f"You have selected {language_codes[user_code]}.")
            return user_code
        else:
            print("It's not a valid language code!")

# Main translation loop
def translation_loop(selected_code):
    while True:
        text_to_translate = input("\nWrite the text you want to translate (or type 'close' to exit): ").strip()
        
        if text_to_translate.lower() == "close":
            print("Have a nice day!")
            break

        # Perform translation
        translated = translator.translate(text_to_translate, dest=selected_code)

        # Display results
        print(f"\n{language_codes[selected_code]} translation: {translated.text}")
        print(f"Pronunciation: {translated.pronunciation}")

        # Identify the source language
        source_language = language_codes.get(translated.src, "Unknown")
        print(f"Translated from: {source_language}")

# Run the program
if __name__ == "__main__":
    selected_language_code = get_language_code()
    translation_loop(selected_language_code)
