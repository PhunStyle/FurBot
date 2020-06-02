function blm(client, evt) {
  let message = `Hello FurBot User,

We enter Pride Month :prideMonth:  this year with a bit of a sour taste in our mouths. Because of the events of the past days and the ones still on-going, I think it's important to use this platform, however small it may be, to spread this message.

In addition to providing the links below ***all  proceeds of the FurBot Patreon (https://www.patreon.com/Phun) for June & July*** will go to charity.
That being said, **please donate to them directly** if you can - since patreon does take a % of earnings.

**reclaim the block:** <https://secure.everyaction.com/zae4prEeKESHBy0MKXTIcQ2>
**black visions collective:** <https://secure.everyaction.com/4omQDAR0oUiUagTu0EG-Ig2>
**black owned businesses' gofundme pages:** <https://docs.google.com/document/d/1jy_Y714oFhb7APUOk4Y4gEPzWpyxswzHa_sylQLVmJ8/>

Please go to the websites yourselves, do research, see which one matters to you most and please donate, write petitions, raise your voice, stand with the black community, now more than ever.

If you need more information please visit: <https://blacklivesmatters.carrd.co>

Black Lives Matter. Thank you. :brown_heart:`

  return evt.message.channel.sendMessage(message);
}

export default {
  blm
};

export const help = {
  blm: {}
};
