#!/usr/bin/env node
import bloodDonor from './';
let args = process.argv.slice(2);
bloodDonor(args[0], function (err, data) {
  if (err) {
    throw new Error(err);
  }
  console.log(`Ideal donor: ${data.ideal}`);
  console.log(`Donors: ${data.donors.join(' or ')}`);
  console.log(`Critical Donors (Rh+): ${data.criticalDonors.join(' or ')}`);
});
