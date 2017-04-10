import Promise from 'bluebird';


function food(client, evt) {
  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      if (user !== evt.message.author) receiverArray.push(user.mention);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

      const foods = [
        `gives ${receivers} a delicious \uD83C\uDF4E`,
        `gives ${receivers} a delicious \uD83C\uDF50`,
        `gives ${receivers} a delicious \uD83C\uDF4A`,
        `gives ${receivers} a delicious \uD83C\uDF4C`,
        `gives ${receivers} a delicious \uD83C\uDF49`,
        `gives ${receivers} a delicious \uD83C\uDF53`,
        `gives ${receivers} a delicious \uD83C\uDF51`,
        `gives ${receivers} a delicious \uD83D\uDC1B ..what? EW!`,
        `gives ${receivers} a delicious \uD83D\uDC1E ..what? EW!`,
        `gives ${receivers} a delicious \uD83C\uDF46 \uD83D\uDE0F`,
        `shares a \uD83C\uDF54 with ${receivers}`,
        `shares some \uD83C\uDF5F with ${receivers}`,
        `hands ${receivers} some real good \uD83C\uDF2E !`,
        `gives ${receivers} a \uD83C\uDF6D`,
        `prepares some tasty \uD83C\uDF63 for ${receivers}!`,
        `cooks some fine \uD83C\uDF5C for ${receivers}!`,
        `cooks up some \uD83C\uDF72 for ${receivers}!`,
        `has prepared some \uD83C\uDF5D for ${receivers}!`,
        `stuffs a dirt-covered old \uD83E\uDD54 in the mouth(s) of ${receivers}`
      ];

      const rand = Math.floor(Math.random() * foods.length);
      return Promise.resolve(evt.message.author.mention + ` ${foods[rand]}`);
    }
  }
  return Promise.resolve(evt.message.author.mention + ` eats all the food themselves! How greedy! :angry:`);
}

export default {
  food
};

export const help = {
  food: {
    parameters: ['@User']
  }
};
