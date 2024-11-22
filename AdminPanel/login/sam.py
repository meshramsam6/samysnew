import tkinter as tk
from tkinter import filedialog, Text, Menu, messagebox, Toplevel, OptionMenu, StringVar, Scrollbar
import pytesseract as pyt
import cv2
from PIL import Image, ImageTk
from googletrans import Translator

# Set the Tesseract command path
pyt.pytesseract.tesseract_cmd = "C:\Program Files\Tesseract-OCR\tesseract.exe"

translator = Translator()

# Dictionary for language full names and their codes
LANGUAGES = {
    'Spanish': 'es',
    'French': 'fr',
    'German': 'de',
    'Hindi': 'hi',
    'Chinese (Simplified)': 'zh-cn',
    'Arabic': 'ar',
    'Russian': 'ru'
}

def open_file():
    file_path = filedialog.askopenfilename(filetypes=[("Image Files", "*.png;*.jpg;*.jpeg;*.bmp;*.tiff")])
    if file_path:
        status_label.config(text="Processing image...")
        img = cv2.imread(file_path)
        show_image(img)
        extract_text(img)
        status_label.config(text="OCR Complete.")

def show_image(img):
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_pil = Image.fromarray(img_rgb)
    img_pil.thumbnail((400, 400))
    img_tk = ImageTk.PhotoImage(img_pil)
   
    panel.config(image=img_tk)
    panel.image = img_tk

def extract_text(img):
    text = pyt.image_to_string(img)
   
    # Create a new window to display the extracted text
    ocr_window = Toplevel(root)
    ocr_window.title("Extracted Text")
    ocr_window.geometry("600x500")  # Set the size of the window
   
    # Create a frame for the text display and scrollbar
    ocr_text_frame = tk.Frame(ocr_window)
    ocr_text_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
   
    # Add a scrollbar to the text display
    ocr_scrollbar = Scrollbar(ocr_text_frame)
    ocr_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
   
    # Create a text widget to display the extracted text
    ocr_text_display = Text(ocr_text_frame, wrap=tk.WORD, bg="#ffffff", fg="#000000", font=("Arial", 12), yscrollcommand=ocr_scrollbar.set)
    ocr_text_display.insert(tk.END, text)
    ocr_text_display.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
   
    ocr_scrollbar.config(command=ocr_text_display.yview)

    # Button frame in OCR window
    button_frame_ocr = tk.Frame(ocr_window, bg="#f0f0f0")
    button_frame_ocr.pack(pady=10)

    # Clear button inside the OCR window
    def clear_text_ocr():
        ocr_text_display.delete(1.0, tk.END)

    clear_button_ocr = tk.Button(button_frame_ocr, text="Clear Text", command=clear_text_ocr, bg="#f44336", fg="white", padx=20, pady=10, font=("Arial", 10))
    clear_button_ocr.grid(row=0, column=0, padx=10)

    # Translate button inside the OCR window
    def translate_text_ocr():
        text = ocr_text_display.get("1.0", tk.END).strip()
        if not text:
            messagebox.showwarning("No Text", "Please extract text first.")
            return

        def perform_translation():
            selected_language = lang_var.get()
            lang_code = LANGUAGES[selected_language]
            translation = translator.translate(text, dest=lang_code)
            translated_display.delete(1.0, tk.END)
            translated_display.insert(tk.END, translation.text)

        translate_window = Toplevel(ocr_window)
        translate_window.title("Translate Text")
        translate_window.geometry("400x300")

        lang_var = StringVar(translate_window)
        lang_var.set("Spanish")  # Default to Spanish

        # Language options dropdown (with full language names)
        lang_menu = OptionMenu(translate_window, lang_var, *LANGUAGES.keys())
        lang_menu.pack(pady=10)

        translate_button = tk.Button(translate_window, text="Translate", command=perform_translation, bg="#4CAF50", fg="white", padx=20, pady=10, font=("Arial", 10))
        translate_button.pack(pady=10)

        translated_display = Text(translate_window, wrap=tk.WORD, width=50, height=10, bg="#ffffff", fg="#000000", font=("Arial", 12))
        translated_display.pack(pady=10)
        
    translate_button_ocr = tk.Button(button_frame_ocr, text="Translate Text", command=translate_text_ocr, bg="#FF9800", fg="white", padx=20, pady=10, font=("Arial", 10))
    translate_button_ocr.grid(row=0, column=1, padx=10)

    status_label.config(text="OCR Complete.")

def clear_text():
    text_display.delete(1.0, tk.END)
    panel.config(image='')

def about_app():
    messagebox.showinfo("About", "OCR Application\nVersion 1.0\nBuilt with Python and Tesseract")

def capture_image():
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    if ret:
        status_label.config(text="Processing captured image...")
        show_image(frame)
        extract_text(frame)
        status_label.config(text="OCR Complete.")
    cap.release()

# Create the main window
root = tk.Tk()
root.title("OCR Application")
root.geometry("600x600")
root.configure(bg="#f0f0f0")

# Menu bar
menu_bar = Menu(root)
root.config(menu=menu_bar)

file_menu = Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label="File", menu=file_menu)
file_menu.add_command(label="Open", command=open_file)
file_menu.add_separator()
file_menu.add_command(label="Exit", command=root.quit)

help_menu = Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label="Help", menu=help_menu)
help_menu.add_command(label="About", command=about_app)

# Create a panel to display the image
panel_frame = tk.Frame(root, bg="#f0f0f0")
panel_frame.pack(pady=10)
panel = tk.Label(panel_frame, bg="#ffffff", width=400, height=400)
panel.pack()

# Create a button frame for opening, clearing, and capturing images
button_frame = tk.Frame(root, bg="#f0f0f0")
button_frame.pack(pady=10)

open_button = tk.Button(button_frame, text="Open Image", command=open_file, bg="#4CAF50", fg="white", padx=20, pady=10, font=("Arial", 10))
open_button.grid(row=0, column=0, padx=10)

clear_button = tk.Button(button_frame, text="Clear Text", command=clear_text, bg="#f44336", fg="white", padx=20, pady=10, font=("Arial", 10))
clear_button.grid(row=0, column=1, padx=10)

capture_button = tk.Button(button_frame, text="Capture Image", command=capture_image, bg="#2196F3", fg="white", padx=20, pady=10, font=("Arial", 10))
capture_button.grid(row=0, column=2, padx=10)

# Create a text widget to display the extracted text
text_display = Text(root, wrap=tk.WORD, width=50, height=15, bg="#ffffff", fg="#000000", font=("Arial", 12))
text_display.pack(pady=10)

# Create a status bar
status_label = tk.Label(root, text="Ready", bd=1, relief=tk.SUNKEN, anchor=tk.W, bg="#d3d3d3", fg="#000000")
status_label.pack(side=tk.BOTTOM, fill=tk.X)

# Run the application
root.mainloop()