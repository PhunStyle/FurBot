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
  doot: () => Promise.resolve('https://i.imgur.com/ZX79Q4S.gif')
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
