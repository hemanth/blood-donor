const bloodTypeRE = /^(O|A|B|AB)((\-|\+|)|(\-ve|\+ve))$/i;
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
  let [, group, rh] = bloodTypeRE.exec(type);
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
