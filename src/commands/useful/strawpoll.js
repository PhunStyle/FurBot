// import Promise from 'bluebird';
// import R from 'ramda';
// import _request from 'request';
//
// import T from '../../translate';
//
//
// const request = Promise.promisify(_request);
//
// function makePoll(client, evt, suffix) {
//   if (!suffix) return evt.message.channel.sendMessage(`${T('poll_usage')}`);
//   suffix = suffix.split(' | ');
//   let question = suffix.shift().toString();
//   // console.log(question);
//   let polloptions = suffix.toString().split(', ');
//   // console.log(polloptions);
//
//   const options = {
//     url: 'https://strawpoll.me/api/v2/polls',
//     method: 'POST',
//     headers:{
//       'Content-Type':'application/json'
//     },
//     json: true,
//     body: {
//        "title": "This is a test poll.",
//        "options": [
//            "Option #1",
//            "Option #2"
//        ],
//        "multi": true
//     }
//   };
//
//   return request(options).then(R.prop('body'));
// }
//
// export default {
//   poll: makePoll,
//   strawpoll: makePoll
// };
//
// export const help = {
//   poll: { parameters: 'text' }
// };
