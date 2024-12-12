import tkinter as tk

class Label:
  def __init__(self, text: str, parent: tk.Tk):
    """
    Create a Label widget.
    """
    self.elem = tk.Label(parent, text=text)

  def render(self) -> None:
    """
    Render the Label widget.
    """
    self.elem.pack()

class Button:
  def __init__(self, text: str, command: callable, parent: tk.Tk):
    """
    Create a Button widget.
    """
    self.elem = tk.Button(parent, text=text, command=command)

  def render(self):
    """
    Render the Button widget.
    """
    self.elem.pack()

class Entry:
  def __init__(self, parent: tk.Tk):
    """
    Create an Entry widget.
    """
    self.elem = tk.Entry(parent)

  def render(self):
    """
    Render the Entry widget.
    """
    self.elem.pack()
