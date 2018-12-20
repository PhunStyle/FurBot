import morse from 'morjs';
import Promise from 'bluebird';

morse.defaults.mode = 'simple';

function morseEncode(client, evt, suffix) {
  let morseSuffix = suffix.split(' ');
  if (morseSuffix[0] === 'encode') morseSuffix.shift();
  if (morseSuffix.length === 0) return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  Please input text to encode into morse code!`});

  let morseString = morseSuffix.join(' ');

  let output = morse.encode(morseString);

  return Promise.resolve(evt.message.channel.sendMessage(output))
}

function morseDecode(client, evt, suffix) {
  let morseSuffix = suffix.split(' ');
  if (morseSuffix[0] === 'encode') morseSuffix.shift();
  if (morseSuffix.length === 0) return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  Please input morse code to decode into text!`});

  let morseString = morseSuffix.join(' ');

  let output = morse.decode(morseString);

  return Promise.resolve(evt.message.channel.sendMessage(output))
}


export default {
  morse: (client, evt, suffix, lang) => {
    const command = suffix.toLowerCase().split(' ')[0];
    if (command === 'encode') return morseEncode(client, evt, suffix);
    if (command === 'decode') return morseDecode(client, evt, suffix);
    if (command !== 'encode' || command !== 'decode') return morseEncode(client, evt, suffix);
  }
};

export const help = {
  morse: { parameters: ['encode', 'or', 'decode'] }
};
