import Promise from 'bluebird';
import path from 'path';


export default {
  awoo: () => Promise.resolve({upload: path.join(__dirname, '../images/Awoo.png')}),
  ayylmao: () => Promise.resolve({upload: path.join(__dirname, '../images/Ayylmao.png')}),
  badfurry: () => Promise.resolve({upload: path.join(__dirname, '../images/Badfurry.jpg')}),
  chillinmyb: () => Promise.resolve({upload: path.join(__dirname, '../images/Chillinmyb.jpg')}),
  endall: () => Promise.resolve({upload: path.join(__dirname, '../images/Endall.png')}),
  erp: () => Promise.resolve('https://i.imgur.com/x6ErEX6.gif'),
  feelsbadman: () => Promise.resolve({upload: path.join(__dirname, '../images/Feelsbadman.png')}),
  feelsbadmanhd: () => Promise.resolve({upload: path.join(__dirname, '../images/FeelsbadmanHD.png')}),
  feelsgoodman: () => Promise.resolve({upload: path.join(__dirname, '../images/Feelsgoodman.png')}),
  feelsgoodmanhd: () => Promise.resolve({upload: path.join(__dirname, '../images/FeelsgoodmanHD.png')}),
  jpeg: () => Promise.resolve('https://www.youtube.com/watch?v=QEzhxP-pdos'),
  kappa: () => Promise.resolve({upload: path.join(__dirname, '../images/Kappa.png')}),
  kappahd: () => Promise.resolve({upload: path.join(__dirname, '../images/Kappahd.png')}),
  doot: () => Promise.resolve('https://i.imgur.com/ZX79Q4S.gif'),
  party: () => Promise.resolve('. o ･ <a:blobparty9:403304364850020354><a:blobparty8:403304364950814722><a:blobparty7:403304365169049622><a:blobparty6:403304365139558401><a:blobparty5:403304365542211594><a:blobparty4:403304365802127360><a:blobparty3:403304365638811658><a:blobparty2:403304364984238093><a:blobparty1:403304365370114059> ･ o .'),
  newyear: () => Promise.resolve(`⁣⁣◼️◼️◼️◼️◼️◼️◼️◼️
◼️◼️◼️🌟◼️◼️◼️◼️
◼️◼️🌟🌟🌟🌟◼️◼️
◼️🌟💥💥🌟💥✨◼️
◼️◼️🌟🌟💥🌟◼️◼️
◼️◼️◼️⁣🌟🌟◼️◼️◼️
◼️◼️◼️◼️◼️◼️◼️◼️
HAPPY NEW YEAR!!
◼️◼️◼️◼️◼️◼️◼️◼️
🏫🏠🏡🏫🏩🏪🏡🏠
    👫👬👫👭`),
  xmastree: () => Promise.resolve(`
    ✨。          🌟。    ❇
   。             🎄         。。
      ❇    🎄🎄。 。   ✨
 ❇        🎄🔴🎄   💫。
      。 🎄🔴🎀🎄 。❇
  。   🎄🎀🎄🔴🎄。。
    ✨ 🎄🎄🎀🎄。
。。🎄🎄🔴🎄🎄。 ❇
    🎄🎄🎀🎄🔴🎄
 🎄🔴🎄🎄🎀🎄🎄
。 🎄🎀🎄🎄🔴🎄      ✨
  🎄🎄🔴🎄🎄🎀🎄
🎄🔴🎄🎀🔴🎄🎄🎄
\u200b                📦📦📦
\u200b            📦📦📦📦
<:santacat:525293333958885376> **HAPPY HOLIDAYS** <:santacat:525293333958885376>`),

};

export const help = {
  awoo: {category: 'other'},
  ayylmao: {category: 'other'},
  badfurry: {category: 'other'},
  chillinmyb: {category: 'other'},
  endall: {category: 'other'},
  erp: {category: 'other'},
  feelsbadman: {category: 'other'},
  feelsbadmanhd: {category: 'other'},
  feelsgoodman: {category: 'other'},
  feelsgoodmanhd: {category: 'other'},
  jpeg: {category: 'other'},
  kappa: {category: 'other'},
  kappahd: {category: 'other'},
  doot: {category: 'other'}
};
