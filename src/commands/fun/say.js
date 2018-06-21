function say(client, evt, suffix) {
  if (!suffix) return;
  return evt.message.channel.sendMessage(suffix);
}

export default {
  say
};

export const help = {
  say: { parameters: 'text' }
};
