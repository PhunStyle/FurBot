function hug(client, evt) {
  if (evt.message.mentions.length !== 0) {
    let receiver = evt.message.mentions[0];

    const hugs = [
      `shares a warm hug with ${receiver.mention}`,
      `knoodles a proodle with ${receiver.mention}`
    ]

    const rand = Math.floor(Math.random() * hugs.length);
    return evt.message.channel.sendMessage(evt.message.author.mention + `${hugs[rand]}`)
  }
}

export default {
  hug
};

export const help = {
  hug: {}
};
