const { Command } = require('../../../../dist');

module.exports = class extends Command {
  constructor(client) {
    super(client, { name: 'test', aliases: ['テスト'] });
  }
  run(message) {
    return message.channel.send('test');
  }
};
