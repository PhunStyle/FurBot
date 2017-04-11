import Promise from 'bluebird';
import nconf from 'nconf';


function getUnicodeCharacter(cp) {

    if (cp >= 0 && cp <= 0xD7FF || cp >= 0xE000 && cp <= 0xFFFF) {
        return String.fromCharCode(cp);
    } else if (cp >= 0x10000 && cp <= 0x10FFFF) {

        // we substract 0x10000 from cp to get a 20-bits number
        // in the range 0..0xFFFF
        cp -= 0x10000;

        // we add 0xD800 to the number formed by the first 10 bits
        // to give the first byte
        var first = ((0xffc00 & cp) >> 10) + 0xD800

        // we add 0xDC00 to the number formed by the low 10 bits
        // to give the second byte
        var second = (0x3ff & cp) + 0xDC00;

        return String.fromCharCode(first) + String.fromCharCode(second);
    }
}

function escapeMessage(client, evt, suffix) {

  console.log(getUnicodeCharacter(suffix));
  let res = suffix.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/, '\\f');
  console.log('Escape: ', res);
  evt.message.channel.sendMessage('```' + res + '```')
}

export default {
  escape: escapeMessage
};
