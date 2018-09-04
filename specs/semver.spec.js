var semver = require('../lib/umd-semver')

describe('semver UMD module', () => {
  it('returns correct version when validating valid version string', () => {
    expect(semver.valid('1.2.3')).toBe('1.2.3');
  });

  it('returns null when validating invalid version string', () => {
    expect(semver.valid('a.b.c')).toBe(null);
  });

  it('cleans semver string correctly', () => {
    expect(semver.clean('  =v1.2.3   ')).toBe('1.2.3');
  });

  it('validates correctly if a semver version matches a given range', () => {
    expect(semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3')).toBe(true);
  });

  it('validates correctly if a semver version is greater than another one', () => {
    expect(semver.gt('1.2.3', '9.8.7')).toBe(false);
  });

  it('validates correctly if a semver version is lower than another one', () => {
    expect(semver.lt('1.2.3', '9.8.7')).toBe(true);
  });
});
