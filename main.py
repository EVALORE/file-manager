#!/usr/bin/env python

import os
from commands import *

def commandNotFoundMsg():
  print("-------------------")
  print("command not found")
  print("-------------------")

def greetUser():
  print("Welcome to the file manager")
  print("(write 'help' to get a list of commands)")

def requestCommand():
  try:
    command = input(f"{os.getcwd()} > ")
    command, *args = command.strip().split()

    if not command or command not in commands:
      commandNotFoundMsg()

    if not commands[command].get('action'):
      raise Exception(f"Command '{command}' not found")

    commands[command]['action'](*args)
    requestCommand()

  except (KeyboardInterrupt, EOFError):
    print("\nExiting the file manager. Goodbye!")

  except Exception as e:
    print(f"An error occurred: {e}")
    requestCommand()

greetUser()
requestCommand()
