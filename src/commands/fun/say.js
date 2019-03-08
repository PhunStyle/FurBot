import { cleanSay } from '../../helpers';

function say(client, evt, suffix) {
  if (!suffix) return;
  suffix = cleanSay(suffix);
  return evt.message.channel.sendMessage(suffix);
}

function delsay(client, evt, suffix) {
  if (!suffix) return;
  suffix = cleanSay(suffix);
  evt.message.delete();
  return evt.message.channel.sendMessage(suffix);
}

export default {
  say,
  delsay
};

export const help = {
  say: { parameters: 'text' }
};
