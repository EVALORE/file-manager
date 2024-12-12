import fsCommands
import nwdCommands
import compressCommands
import os
import fvs
import tkinter as tk

def listAllCommands():
  print("-------------------")
  print("available commands:")
  print("-------------------")
  for key, obj in commands.items():
    print(f"{key} - {obj['description']}")
  print("-------------------")


commands = {
  "code": {
    "category": "special",
    "description": "open your favorite editor",
    "action": lambda: os.system('code .')
  },
  "fv": {
    "category": "special",
    "description": "show your favorite paths",
    "action": fvs.listPaths
  },
  "fvd": {
    "category": "special",
    "description": "add a favorite path",
    "action": fvs.addCurrentPathToPaths
  },
  "fvs": {
    "category": "special",
    "description": "set path from favorite as current",
    "action": fvs.changeCurrentPath
  },
  "help": {
    "category": "help",
    "description": "show help",
    "action": listAllCommands
  },
  "q!": {
    "category": "exit",
    "description": "exit the program",
    "action": exit
  },
  "os": {
    "category": "os",
    "description": "get the operating system",
    "action": lambda: print(os.name)

  },
  "up": {
    "category": "nwd",
    "description": "go up a directory",
    "action": nwdCommands.up
  },
  "ls": {
    "category": "nwd",
    "description": "list the contents of a directory",
    "action": nwdCommands.ls
  },
  "cd": {
    "category": "nwd",
    "description": "change directory",
    "action": nwdCommands.cd
  },
  "lf": {
    "category": "nwd",
    "description": "list only files",
    "action": nwdCommands.lf
  },
  "rd": {
    "category": "fs",
    "description": "read a file",
    "action": fsCommands.readFile
  },
  "add": {
    "category": "fs",
    "description": "create a file",
    "action": fsCommands.createFile
  },
  "rn": {
    "category": "fs",
    "description": "rename a file",
    "action": fsCommands.renameFile
  },
  "cp": {
    "category": "fs",
    "description": "copy a file",
    "action": fsCommands.copyFile
  },
  "mv": {
    "category": "fs",
    "description": "move a file",
    "action": fsCommands.moveFile
  },
  "rm": {
    "category": "fs",
    "description": "delete a file",
    "action": fsCommands.deleteFile
  },
  "cmpr": {
    "category": "compress",
    "description": "compress a file",
    "action": compressCommands.compressFile
  },
  "decmpr": {
    "category": "compress",
    "description": "decompress a file",
    "action": compressCommands.decompressFile
  },
  "cl": {
    "category": "fs",
    "description": "clear the screen",
    "action": lambda: os.system('cls' if os.name == 'nt' else 'clear')
  }
}


