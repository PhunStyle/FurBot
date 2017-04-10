import Promise from 'bluebird';

function coin() {
  const number = Math.floor(Math.random() * 2) + 1;
  if (number === 1) return Promise.resolve({upload: 'src/images/coinHeads.png'});
  return Promise.resolve({upload: 'src/images/coinTails.png'});
}

export default {
  coin,
  coinflip: coin,
  flip: coin,
  flipcoin: coin
};

export const help = {
  coin: {}
};
