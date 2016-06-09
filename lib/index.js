const bloodgroupValidator = require('bloodtype-validator');
const bloodtypeRegex = /^([a-z]{1,})(\+|\-)(ve)?$/i;
const typeMap = {
  A: 'A,O',
  O: 'O',
  AB: 'AB,A,B,O',
  B: 'B,O'
};
export default (type, cb) => {
  if (!type) {
    cb(new Error('Unknow blood type!'));
  }
  let regexResult = bloodtypeRegex.exec(type.trim());
  if (!regexResult) {
    return cb(new Error(type + ' does not look like an expected bloodtype format. Expected formats look like A+ or A+ve'));
  } 
  let [,group,rh] = regexResult;
  if (bloodgroupValidator(group) === false) {
    return cb(new Error(type + ' is not a valid blood type'));
  }
  let donors = [];
  let criticalDonors = [];
  typeMap[group.toUpperCase()].split(',').forEach((donorType) => {
    donors.push(`${donorType}${rh}`);
    if (rh === '+' || rh === '+ve') {
      criticalDonors.push(`${donorType}-ve`);
    }
  });
  cb(null, {ideal: `${group}${rh}`, donors: donors, criticalDonors: criticalDonors});
};
