import { cleanName } from '../../helpers';

function say(client, evt, suffix) {
  if (!suffix) return;
  suffix = cleanName(suffix);
  return evt.message.channel.sendMessage(suffix);
}

export default {
  say
};

export const help = {
  say: { parameters: 'text' }
};
