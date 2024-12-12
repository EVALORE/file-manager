import os
import tkinter as tk
from commands import *

def execute_command():
    """
    Parse and execute the command entered in the input field.
    """
    try:
        user_input = command_entry.get().strip()
        command_entry.delete(0, tk.END)

        if not user_input:
            output_text.insert(tk.END, "No command entered.\n")
            return

        command, *args = user_input.split()
        if command not in commands:
            output_text.insert(tk.END, f"Command '{command}' not found.\n")
            return

        action = commands[command]["action"]
        if callable(action):
            result = action(*args) or ""
            output_text.insert(tk.END, f"{result}\n")
        else:
            output_text.insert(tk.END, f"Command '{command}' is not executable.\n")

        update_cwd()

    except Exception as e:
        output_text.insert(tk.END, f"Error: {e}\n")

def update_cwd():
    """
    Update the current working directory label.
    """
    cwd_label.config(text=f"Current Directory: {os.getcwd()}")

def quit_app():
    """
    Quit the application with a confirmation prompt.
    """
    if messagebox.askokcancel("Quit", "Do you really want to quit?"):
        root.destroy()

# Main GUI application
root = tk.Tk()
root.title("File Manager")
root.geometry("600x400")

# Run the application
update_cwd()
root.mainloop()
