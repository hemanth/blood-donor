const bloodgroupValidator = require('bloodtype-validator');
const bloodtypeRegex = /^([a-z]{1,})(\+|\-)(ve)?$/i;
const typeMap = {
  A: 'A,O',
  O: 'O',
  AB: 'AB,A,B,O',
  B: 'B,O'
};
export default (type, cb) => {
  if (!cb || typeof cb !== 'function') {
    cb = function (error){
      if(error) console.log(error);
    }
  }
  if (!type) {
    return cb(new Error('Unknown blood type!'));
  }
  if (typeof type !== 'string') {
    return cb(new Error('bloodtype given is not a string'));
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
