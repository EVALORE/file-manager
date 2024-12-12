import tabulate
import os
import pathlib

def showAsTable(header, rows):
  print(tabulate.tabulate(rows, headers=header, tablefmt="grid"))


def get_file_size(file_path):

  size = os.path.getsize(file_path)
  for unit in ['', 'K', 'M', 'G']:
    if size < 1024.0:
        break
    size /= 1024.0
  return f"{size:.2f} {unit}B"

def up():
  os.chdir('..')

def ls():
  header = ['name', 'extension', 'size']
  rows = []
  for x in os.listdir():
    name,ext = os.path.splitext(x)
    rows.append([name, ext, get_file_size(x)])

  showAsTable(header, rows)

def lf():
  header = ['name', 'extension', 'size']
  rows = []
  for x in os.listdir():
    name,ext = os.path.splitext(x)
    if (os.path.isfile(x)):
      rows.append([name, ext, get_file_size(x)])

  showAsTable(header, rows)

def cd(name = ''):
  os.chdir(name if name else pathlib.Path.home())
