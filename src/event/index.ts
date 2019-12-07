import Message from './message';

import print from '../lib/print';

export default (client: any, name: string, callback: any) => {
  switch (name) {
    case 'ready':
      print.info(`Go!! ${client.user.tag}`);
      break;
    case 'message':
      new Message(client).handle(callback);
      break;
    default:
      break;
  }
  return true;
};
