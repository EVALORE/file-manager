import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const env = require('./data/environment.json');

function showMessage(id) {
  const messageIds = {
    greetUser: `Welcome to the File Manager, \x1b[35m${env.username}\x1b[0m!`,
    closeApp: `Thank you for using File Manager, ${env.username}, goodbye!`,
    showCurrentDirectory: `You are currently in \x1b[35m${process.cwd()}\x1b[0m!`,
    tooManyArguments: 'Too many arguments',
    sourcePathIsMissing: 'Source path is missing',
    destinationPathIsMissing: 'Destination path is missing',
    topLevelDirectory: 'You are already at the top level directory',
    missingArgument: 'Missing argument',
    invalidInput: 'Invalid input',
    operationFailed: 'Operation failed',
  };

  messageIds[id] && console.log(messageIds[id]);
  console.log('────────────────────────────────────────────');
}

export { showMessage };
