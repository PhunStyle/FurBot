function furbot(client, evt) {
  let message = `Hello There!

We're super excited to announce that we're building FurBot from scratch! This means that we have a lot of options right now
to explore new features and ideas, to see if we can structure commands and their outputs a bit differently, to re-do the help
menu and look into automatic crash and performance reports on a per-shard basis.

**That's all very cool, FurBot, but what does that mean for me?**

Well i'm very glad you asked! That means that now is a GREAT time to suggest new features or give feedback about current ones.
Of course you could give a simple idea like, "add this action command". But if you've always had a cool idea or feature that you
wanted to see in FurBot, now is the time to think it through and submit it! Think about economy features/pets that you need to take
care of and feed/a web panel/more server or command settings/a profile with badges or items or stats or whatever, let your ideas go
crazy and take them to the next level!

**Alright i'm ready, how do i submit this idea?**

Head on over to the FurBot discord server with this link and accept the rules, then go to the Suggestions channel!
https://discord.gg/4FRcCzP`;

  return evt.message.channel.sendMessage(message);
}

export default {
  furbot
};

export const help = {
  furbot: {}
};
