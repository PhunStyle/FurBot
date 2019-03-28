import randomWord from 'random-word';

function word(client, evt) {
  let word = randomWord();
  let dissect = word.split('');

  let regionalArray = [];

  dissect.map(character => {
    let regionalCharacter = ':regional_indicator_' + character + ':\u200b';
    regionalArray.push(regionalCharacter);
  })

  let output = regionalArray.join('');
  return evt.message.channel.sendMessage(output);
}

export default {
  word
};

export const help = {
  word
};
