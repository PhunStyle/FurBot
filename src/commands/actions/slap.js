import Promise from 'bluebird';


function slap(client, evt) {
  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      receiverArray.push(user.mention);
    });

    let receivers = receiverArray.join(' and ');

    const slaps = [
      `slaps ${receivers}! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
      `smacked ${receivers}! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
      `just slapped ${receivers}! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
      `walks up to ${receivers} and slaps them in the face :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
      `bitch slaps ${receivers}! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
      `smacks ${receivers} hard, ouch! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
      `beats some sense into ${receivers} :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
      `sends out slaps to ${receivers} :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
      `slaps ${receivers} hard, leaving a red mark! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`
    ];

    const rand = Math.floor(Math.random() * slaps.length);
    return Promise.resolve(evt.message.author.mention + ` ${slaps[rand]}`);
  }
  return Promise.resolve(evt.message.author.mention + ` slaps themselves..?`);
}

export default {
  slap
};

export const help = {
  slap: {
    parameters: ['@User']
  }
};
