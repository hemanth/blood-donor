import assert from 'assert';
import bloodDonor from '../lib';

describe('blood-donor', function () {
  it('should return the donors for B+ve', function (done) {
    bloodDonor('B+ve', function (err, data) {
      assert.equal(data.ideal, 'B+ve');
    });
    done();
  });
  it('should throw an error if no bloodtype argument is given', function (done) {
    bloodDonor(null, function (err, data) {
      assert.equal(err instanceof Error, true);
      assert.equal(typeof data === 'undefined', true);
    });
    done();
  });
  it('should throw an error if bloodtype argument is not a string', function (done) {
    bloodDonor({}, function (err, data) {
      assert.equal(err instanceof Error, true);
      assert.equal(typeof data === 'undefined', true);
    });
    done();
  });
  it('should throw an error if bloodtype argument improperly formatted', function (done) {
    bloodDonor('A++', function (err, data) {
      assert.equal(err instanceof Error, true);
      assert.equal(typeof data === 'undefined', true);
    });
    done();
  });
  it('should throw an error if bloodtype argument is not a valid bloodtype', function (done) {
    bloodDonor('BA+ve', function (err, data) {
      assert.equal(err instanceof Error, true);
      assert.equal(typeof data === 'undefined', true);
    });
    done();
  });
  it('should supply a default callback if one is not provided', function (done) {
    try {
      bloodDonor('B+ve');
    } catch (e) {
      assert.equal(typeof e === 'undefined', true);
    }
    done();
  });
  it('should handle errors with default callback', function (done) {
    try {
      bloodDonor('B++ve');
    } catch (e) {
      assert.equal(typeof e === 'undefined', true);
    }
    done();
  });
});
