import os
import fitz  # PyMuPDF
import google.generativeai as genai
from dotenv import load_dotenv
import speech_recognition as sr  # For voice input
import pyttsx3  # For text-to-speech
import tkinter as tk
from tkinter import Tk, filedialog
from PIL import Image, ImageTk

# Load environment variables from .env file
load_dotenv()

# Initialize text-to-speech engine
engine = pyttsx3.init()

def speak(text, text_widget):
    """Function to convert text to speech and display it."""
    text_widget.insert(tk.END, f"Robot: {text}\n")
    engine.say(text)
    engine.runAndWait()

def listen(text_widget):
    """Function to capture voice input and convert it to text."""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        text_widget.insert(tk.END, "Listening...\n")
        audio = recognizer.listen(source)
        try:
            query = recognizer.recognize_google(audio)
            text_widget.insert(tk.END, f"You: {query}\n")
            return query
        except sr.UnknownValueError:
            speak("Sorry, I did not understand that.", text_widget)
            return None
        except sr.RequestError:
            speak("Could not request results from the speech recognition service.", text_widget)
            return None

def extract_text_from_pdf(pdf_file):
    """Function to extract text from a PDF file."""
    try:
        pdf_document = fitz.open(pdf_file)
        text = ""
        for page in pdf_document:
            text += page.get_text()
        pdf_document.close()
        return text.strip()  # Return cleaned text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

def query_palm_api(context, question):
    """Function to query the PaLM API using the provided context and question."""
    api_key = os.getenv("API")  # Fetch API key from environment variables
    genai.configure(api_key=api_key)
    
    try:
        # Use the appropriate model for querying
        model = genai.GenerativeModel('gemini-1.5-flash')
        # Prepare the prompt for the model
        response = model.generate_content(f"Context: {context}\n\nQuestion: {question}")
        return response.text if response else "No response generated."
    except Exception as e:
        return f"Error: {str(e)}"

def answer_question(pdf_text, query, text_widget):
    """Function to answer questions based on extracted PDF text."""
    if not pdf_text:
        return "No content extracted from the PDF."

    answer = query_palm_api(pdf_text, query)
    return answer

def handle_pdf_mode(text_widget):
    """Function to handle PDF upload and set the mode."""
    global pdf_mode, pdf_text
    
    pdf_path = filedialog.askopenfilename(filetypes=[("PDF Files", "*.pdf")])
    
    if pdf_path:
        pdf_text = extract_text_from_pdf(pdf_path)
        if pdf_text:
            speak("PDF uploaded and text extracted successfully. You can now ask questions about its content.", text_widget)
            pdf_mode = True
        else:
            speak("Failed to extract text from PDF. Please try again.", text_widget)
            pdf_mode = False
    else:
        speak("No file selected. Please select a PDF file.", text_widget)
        pdf_mode = False

def start_conversation(text_widget):
    """Main function to handle the conversation loop."""
    global pdf_mode, pdf_text
    pdf_mode = False
    pdf_text = ""

    handle_pdf_mode(text_widget)

    while True:
        query = listen(text_widget)  # Capture user query
        if query is None:
            continue
        
        if pdf_mode:
            answer = answer_question(pdf_text, query, text_widget)
            speak(answer, text_widget)
        else:
            speak("You are not in PDF mode. Please upload a PDF first.", text_widget)

def create_gui():
    """Function to create the robot GUI."""
    root = tk.Tk()
    root.title("PDF Question Assistant")
    root.geometry("600x600")
import os
import fitz  # PyMuPDF
import google.generativeai as genai
from dotenv import load_dotenv
from tkinter import Tk
from tkinter.filedialog import askopenfilename
import speech_recognition as sr  # For voice input
import pyttsx3  # For text-to-speech

# Load environment variables from .env file
load_dotenv()

# Initialize text-to-speech engine
engine = pyttsx3.init()

def speak(text):
    """Function to convert text to speech."""
    engine.say(text)
    engine.runAndWait()

def listen():
    """Function to capture voice input and convert it to text."""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            query = recognizer.recognize_google(audio)
            print(f"You said: {query}")
            return query
        except sr.UnknownValueError:
            speak("Sorry, I did not understand that.")
            return None
        except sr.RequestError:
            speak("Could not request results from the speech recognition service.")
            return None

def extract_text_from_pdf(pdf_file):
    """Function to extract text from a PDF file."""
    try:
        pdf_document = fitz.open(pdf_file)
        text = ""
        for page in pdf_document:
            text += page.get_text()
        pdf_document.close()
        return text.strip()  # Return cleaned text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

def query_palm_api(context, question):
    """Function to query the PaLM API using the provided context and question."""
    api_key = os.getenv("API")  # Fetch API key from environment variables
    genai.configure(api_key=api_key)
    
    try:
        # Use the appropriate model for querying
        model = genai.GenerativeModel('gemini-1.5-flash')
        # Prepare the prompt for the model
        response = model.generate_content(f"Context: {context}\n\nQuestion: {question}")
        return response.text if response else "No response generated."
    except Exception as e:
        return f"Error: {str(e)}"

def answer_question(pdf_text, query):
    """Function to answer questions based on extracted PDF text."""
    if not pdf_text:
        return "No content extracted from the PDF."

    answer = query_palm_api(pdf_text, query)
    return answer

def handle_pdf_mode():
    """Function to handle PDF upload and set the mode."""
    global pdf_mode, pdf_text
    
    pdf_path = askopenfilename(filetypes=[("PDF Files", "*.pdf")])
    
    if pdf_path:
        pdf_text = extract_text_from_pdf(pdf_path)
        if pdf_text:
            speak("PDF uploaded and text extracted successfully. You can now ask questions about its content.")
            pdf_mode = True
        else:
            speak("Failed to extract text from PDF. Please try again.")
            pdf_mode = False
    else:
        speak("No file selected. Please select a PDF file.")
        pdf_mode = False

def main():
    global pdf_mode, pdf_text
    pdf_mode = False
    pdf_text = ""

    # Hide the root window
    Tk().withdraw()

    speak("Welcome to the PDF Question Assistant.")
    handle_pdf_mode()

    while True:
        query = listen()  # Capture user query
        if query is None:
            continue
        
        if pdf_mode:
            answer = answer_question(pdf_text, query)
            speak(answer)
            print("Answer from PDF:", answer)  # Debug print
        else:
            speak("You are not in PDF mode. Please upload a PDF first.")

if __name__ == '__main__':
    main()
    # Load robot image
    robot_img = Image.open("robot_face.png")
    robot_img = robot_img.resize((100, 100), Image.ANTIALIAS)
    robot_photo = ImageTk.PhotoImage(robot_img)

    # Create robot image label
    robot_label = tk.Label(root, image=robot_photo)
    robot_label.pack(pady=10)

    # Create text area for displaying conversation
    text_widget = tk.Text(root, height=20, width=70)
    text_widget.pack(pady=10)

    # Create buttons for user interaction
    upload_button = tk.Button(root, text="Upload PDF", command=lambda: handle_pdf_mode(text_widget))
    upload_button.pack(pady=5)

    start_button = tk.Button(root, text="Start Conversation", command=lambda: start_conversation(text_widget))
    start_button.pack(pady=5)

    root.mainloop()

if __name__ == '__main__':
    create_gui()
