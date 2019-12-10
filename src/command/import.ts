import * as fs from 'fs';
import * as path from 'path';

import directory from '../lib/directory';
import print from '../lib/print';

export default class CommandImport {
  commands: Array<any>;
  constructor(client) {
    this.commands = [];
    const directoryPath = directory.get('commands');

    try {
      fs.mkdirSync(directoryPath);
    } catch {
      print.info('Loading command...');
    }
    fs.readdirSync(directoryPath).forEach(thatPath => {
      const subDirectoryPath = path.join(directoryPath, thatPath);
      if (!directory.is(subDirectoryPath)) {
        return print.warn(
          `Files cannot be placed directly under the 'commands' directory (${thatPath})`
        );
      }
      fs.readdirSync(subDirectoryPath)
        .filter(fileName => fileName.match(/\.(?<ext>js|ts)$/u))
        .forEach(fileName => {
          const filePath = path.join(subDirectoryPath, fileName);

          const CommandFile = require(filePath);

          const command = new CommandFile(client);

          command.info.aliases.push(command.info.name);
          if (command.info.aliases) {
            command.info.aliases.forEach(alias => {
              if (this.commands[alias]) this.commandError(command.info.aliases);
              this.commands[alias] = command;
              print.info(`import: ${filePath} - ${alias}`);
            });
          }
        });
    });
    client.commands = this.commands;
  }
  commandError(name) {
    print.error(
      `Can not create a command with the same name. Duplicate command: "${name}"`
    );
  }
}
