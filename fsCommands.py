import os
import shutil

def createFile(name):
  with open(name, 'w') as f:
    f.write('')

def readFile(name):
  with open(name, 'r') as f:
    print(f.read())

def renameFile(oldName, newName):
  os.rename(oldName, newName)

def copyFile(oldName, newName):
  shutil.copy(oldName, newName)

def moveFile(oldName, newPath):
  shutil.move(oldName, f"{newPath}/{oldName}")

def deleteFile(name):
  os.remove(name)

def fileSize(name):
  return os.path.getsize(name)
