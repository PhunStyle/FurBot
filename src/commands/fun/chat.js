import Promise from 'bluebird';
import R from 'ramda';
import _request from 'request';


const request = Promise.promisify(_request);


function chat(client, evt, suffix, lang) {
  if (!suffix) suffix = 'Hello.';
  evt.message.channel.sendTyping();
  let botResponse;

  const options = {
    url: `http://api.program-o.com/v2/chatbot/?bot_id=6&say=${suffix}&convo_id=furbot_${evt.message.author.id}&format=json`,
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };

  return evt.message.channel.sendMessage('<a:typingAnim:459327516012969994>')
  .then(m => {
    request(options)
    .then(R.prop('body'))
    .then(res => {
      botResponse = res.botsay.replace('Program-O', 'FurBot').replace('</br>', '').replace('Program O', 'FurBot');
      client.Messages.editMessage(botResponse, m.id, evt.message.channel.id);
    });
  });
}

export default {
  chat
};

export const help = {
  chat: { parameters: 'text' }
};
