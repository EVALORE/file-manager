import tkinter as tk
import os
from tkWidgets import Label, Entry
import tabulate
import os
import pathlib

def lf():
  header = ['name', 'extension', 'size']
  rows = []
  for x in os.listdir():
    name,ext = os.path.splitext(x)
    if (os.path.isfile(x)):
      rows.append([name, ext, get_file_size(x)])

  return header, rows

def showAsTable(header, rows):
  return tabulate.tabulate(rows, headers=header, tablefmt="plain")

def get_file_size(file_path):

  size = os.path.getsize(file_path)
  for unit in ['', 'K', 'M', 'G']:
    if size < 1024.0:
        break
    size /= 1024.0
  return f"{size:.2f} {unit}B"

root = tk.Tk()

label = Label("Hello, world!", root)
entry = Entry(root)

entry.elem.bind("<Return>", lambda event: label.elem.config(text=f"{showAsTable(*lf())}"))

label.render()
entry.render()

root.title("File Manager")
root.minsize(600, 400)
root.mainloop()
