import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageDraw

class PersonalBook:
    def __init__(self, root):
        self.root = root
        self.root.title("My Personal Book")

        # Set up the text area for writing
        self.text_area = tk.Text(self.root, height=20, width=50)
        self.text_area.grid(row=0, column=0, padx=10, pady=10)

        # Set up the canvas for doodling
        self.canvas = tk.Canvas(self.root, bg="white", width=400, height=400)
        self.canvas.grid(row=0, column=1, padx=10, pady=10)

        # Bind mouse events for drawing
        self.canvas.bind("<B1-Motion>", self.paint)
        self.canvas.bind("<ButtonRelease-1>", self.reset)

        # Set up save button to save text and doodles
        save_button = tk.Button(self.root, text="Save Book", command=self.save_book)
        save_button.grid(row=1, column=0, padx=10, pady=10)

        # Set up clear button to clear the canvas
        clear_button = tk.Button(self.root, text="Clear Doodle", command=self.clear_canvas)
        clear_button.grid(row=1, column=1, padx=10, pady=10)

        # Image object for drawing doodles
        self.image = Image.new("RGB", (400, 400), "white")
        self.draw = ImageDraw.Draw(self.image)
        self.last_x, self.last_y = None, None

    def paint(self, event):
        """Draw on the canvas"""
        if self.last_x and self.last_y:
            self.canvas.create_line(self.last_x, self.last_y, event.x, event.y, fill="black", width=2)
            self.draw.line((self.last_x, self.last_y, event.x, event.y), fill="black", width=2)
        self.last_x, self.last_y = event.x, event.y

    def reset(self, event):
        """Reset drawing coordinates after mouse release"""
        self.last_x, self.last_y = None, None

    def clear_canvas(self):
        """Clear the canvas and reset the image"""
        self.canvas.delete("all")
        self.image = Image.new("RGB", (400, 400), "white")
        self.draw = ImageDraw.Draw(self.image)

    def save_book(self):
        """Save the text and the doodle to separate files"""
        # Save the text to a .txt file
        text_content = self.text_area.get("1.0", tk.END)
        text_file = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text files", "*.txt")])
        if text_file:
            with open(text_file, "w") as file:
                file.write(text_content)

        # Save the doodle to an image file
        doodle_file = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png")])
        if doodle_file:
            self.image.save(doodle_file)

if __name__ == "__main__":
    root = tk.Tk()
    app = PersonalBook(root)
    root.mainloop()
