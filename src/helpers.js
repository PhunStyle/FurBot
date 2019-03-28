export function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function secondDec(n) {
  return Math.round(n * 100) / 100;
}

export function cleanName(string) {
  var chars = { '*': '\\*', _: '\\_', '~': '\\~', '@': '@\u200b' };
  return string.replace(/[*_~@]/g, m => chars[m]);
}

export function cleanSay(string) {
  var chars = { '@': '@\u200b' };
  return string.replace(/[@]/g, m => chars[m]);
}

// return an array of objects according to key, value, or key and value matching
export function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else
    // if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
    if (i === key && obj[i].toString().toLowerCase() === val || i === key && val === '') { //
      objects.push(obj);
    } else if (obj[i] === val && key === '') {
      // only add if the object is not already in the array
      if (objects.lastIndexOf(obj) === -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
}

// return an array of values that match on a certain key
export function getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getValues(obj[i], key));
    } else if (i === key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}

// return an array of keys that match on a certain value
export function getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getKeys(obj[i], val));
    } else if (obj[i] === val) {
      objects.push(i);
    }
  }
  return objects;
}

export function getImageLink(client, evt, suffix, pride) {
  let channel = evt.message.channel;
  let suffixSplit = [];
  if (suffix) suffixSplit = suffix.split(' ');
  let intensity;
  let imageLink;
  let doPrevious = false;

  if (suffixSplit.includes('previous')) doPrevious = true;

  if (suffixSplit.length === 2 && !doPrevious) {
    if (isNaN(suffixSplit[0])) suffixSplit[0] = 1;
    imageLink = suffixSplit[1];
  }

  if (pride) {
    if (suffixSplit.length === 3 && !doPrevious) {
      suffixSplit[1] = suffixSplit[2];
    }
  }

  if (doPrevious) {
    let messageArray = channel.messages.filter(msg => !msg.deleted).reverse();
    let slicedArray = messageArray.slice(0, 5);
    let finalArray = [];

    slicedArray.map(msg => {
      if ((msg.attachments.length) && (msg.author.id === client.User.id)) {
        finalArray.push(msg);
      }
    });

    if (finalArray.length && (evt.message.attachments.length === 0)) {
      if (isNaN(suffixSplit[0])) {
        suffixSplit[0] = 1;
        suffixSplit[1] = finalArray[0].attachments[0].url;
      } else {
        suffixSplit[1] = finalArray[0].attachments[0].url;
      }
      imageLink = suffixSplit[1];
    }
  }

  if (suffixSplit.length === 1 && evt.message.attachments.length === 0 && !doPrevious) {
    if (isNaN(suffixSplit[0])) {
      suffixSplit[1] = suffixSplit[0];
      suffixSplit[0] = 1;
    } else {
      suffixSplit[1] = evt.message.author.getAvatarURL({format: 'png', size: 512, preferAnimated: false});
    }
    imageLink = suffixSplit[1];
  }

  if (suffixSplit.length < 3 && evt.message.attachments.length && !doPrevious) {
    if (evt.message.attachments[0].url) {
      if (isNaN(suffixSplit[0])) {
        suffixSplit[0] = 1;
      }
      suffixSplit[1] = evt.message.attachments[0].url;
      imageLink = suffixSplit[1];
    }
  }

  if (suffixSplit.length === 0 && evt.message.attachments.length === 0 && !doPrevious) {
    suffixSplit[0] = 1;
    suffixSplit[1] = evt.message.author.getAvatarURL({format: 'png', size: 512, preferAnimated: false});
    imageLink = suffixSplit[1];
  }

  return suffixSplit;
}
