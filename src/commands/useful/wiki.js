import Promise from 'bluebird';
import wiki from 'wikijs';

import T from '../../translate';


function wikipedia(client, evt, suffix, lang) {
  if (!suffix) return Promise.resolve(T('wiki_usage', lang));

  return new Promise(resolve => {
    wiki().search(suffix, 1).then(data => {
      wiki().page(data.results[0]).then(page => {
        page.summary().then(summary => {
          resolve(summary.toString().split('\n'));
        });
      })
      .catch(() => {
        resolve(`${T('wiki_error', lang)} **${suffix}**`);
      });
    });
  });
}

export default {
  wiki: wikipedia,
  wikipedia
};

export const help = {
  wiki: {parameters: ['search terms']}
};
