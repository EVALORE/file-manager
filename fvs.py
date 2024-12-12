import json
import os
import pathlib

def getFilePath():
  current_dir = pathlib.Path(__file__).parent
  return current_dir / "data" / "environment.json"

def addCurrentPathToPaths():
  try:
    with open(getFilePath(), "r") as file:
      data = json.load(file)
  except FileNotFoundError:
    print(f"File '{getFilePath()}' not found.")
    with open(getFilePath(), "w") as file:
      json.dump({"paths": [os.getcwd()]}, file)
    return
  except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")
    with open(getFilePath(), "w") as file:
      json.dump({"paths": [os.getcwd()]}, file)
    return
  if os.getcwd() not in data["paths"]:
    data["paths"].append(os.getcwd())
    with open(getFilePath(), "w") as file:
      json.dump(data, file)


def listPaths():
  with open(getFilePath(), "r") as file:
    data = json.load(file)
  for index, path in enumerate(data["paths"]):
    print(f"{index}: {path}")

def removePath(index):
  with open(getFilePath(), "r") as file:
    data = json.load(file)
  data["paths"].pop(index)
  with open(getFilePath(), "w") as file:
    json.dump(data, file)


def changeCurrentPath(index):
  with open(getFilePath(), "r") as file:
    data = json.load(file)
  if int(index) >= len(data["paths"]):
    print(f"List have only {len(data['paths'])} paths")
    return
  os.chdir(data["paths"][int(index)])
