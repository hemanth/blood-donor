import assert from 'assert';
import bloodDonor from '../lib';

describe('blood-donor', function () {
  it('should return the donors for B+ve', function (done) {
    bloodDonor('B+ve', function (err, data) {
      assert.equal(data.ideal, 'B+ve');
    });
    done();
  });
});
