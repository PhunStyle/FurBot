import shin from 'shindan';


function shindan(client, evt, suffix) {
  if (!suffix) {
    let embed = {
      color: 3329023,
      description: 'Usage: `f.shindan topic` | See all available shindan below:',
      fields: [
        { name: 'cute',
          value: 'Check cuteness level',
          inline: true },
        { name: 'perverted',
          value: 'Check how perverted you are',
          inline: true },
        { name: 'dating',
          value: 'Your dating service',
          inline: true },
        { name: 'harem',
          value: 'Check your harem role',
          inline: true },
        { name: 'demonform',
          value: 'What is your demon form',
          inline: true },
        { name: 'soft',
          value: 'How soft are you?',
          inline: true },
        { name: 'senpai',
          value: 'If senpai DID notice you..',
          inline: true },
        { name: 'furrylevel',
          value: 'How furry are you?',
          inline: true },
        { name: 'lore',
          value: 'Whats your town legend?',
          inline: true },
        { name: 'appeared',
          value: 'You appeared, what do?',
          inline: true },
        { name: 'bottomortop',
          value: 'Are you a top or bottom?',
          inline: true },
        { name: 'romance',
          value: 'What are your romance stats?',
          inline: true },
        { name: 'pure',
          value: 'How pure are you?',
          inline: true },
        { name: 'oc',
          value: 'Generates you a new oc!',
          inline: true },
        { name: 'sins',
          value: 'Deadly sins percentage',
          inline: true }
      ]
    };
    return evt.message.channel.sendMessage('', false, embed);
  }

  let authorName = evt.message.author.username;
  let shindanID;

  if (!evt.message.channel.isPrivate) {
    authorName = evt.message.member.name;
  }

  switch (suffix) {
    case 'cute':
      shindanID = 587327;
      break;
    case 'perverted':
      shindanID = 289267;
      break;
    case 'dating':
      shindanID = 695711;
      break;
    case 'harem':
      shindanID = 362069;
      break;
    case 'demonform':
      shindanID = 667505;
      break;
    case 'soft':
      shindanID = 530706;
      break;
    case 'senpai':
      shindanID = 410688;
      break;
    case 'furrylevel':
      shindanID = 618526;
      break;
    case 'lore':
      shindanID = 773265;
      break;
    case 'appeared':
      shindanID = 583485;
      break;
    case 'bottomortop':
      shindanID = 791876;
      break;
    case 'romance':
      shindanID = 669687;
      break;
    case 'pure':
      shindanID = 539508;
      break;
    case 'oc':
      shindanID = 547942;
      break;
    case 'sins':
      shindanID = 505181;
      break;
    default:
      shindanID = 587327;
  }

  shin.diagnose(shindanID, authorName)
  .then(diagnosis => {
    let embed = { color: 3329023, description: `<:icon_shindan:402174157166608384> ${diagnosis.result}` };
    evt.message.channel.sendMessage('', false, embed);
  })
  .catch(err => {
    let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong: ${err}` };
    evt.message.channel.sendMessage('', false, embed);
  });
}

export default {
  shindan
};

export const help = {
  shindan: {}
};
