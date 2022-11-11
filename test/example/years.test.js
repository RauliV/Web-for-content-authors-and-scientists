describe('getYears(publications)', function () {
  let publications;
  let years;

  before(function () {
    publications = getPublications(publicationsData);
  });

  beforeEach(function () {
    years = getYears(publications);
  });

  it('should return a non-empty array', function () {
    chai.expect(years).to.be.an('array');
    chai.expect(years).to.not.be.empty;
  });

  it('should return all years which are present in the publications', function () {
    const publYears = Object.keys(publications);
    chai.expect(years).to.be.an('array');

    publYears.forEach(year => {
      chai.expect(years).to.include(year);
    });
  });

  it('should return only years which are present in the publications', function () {
    const publYears = Object.keys(publications);
    chai.expect(years).to.be.an('array');

    years.forEach(year => {
      chai.expect(publYears).to.include(year);
    });
  });

  it('should return only unique years sorted in ascending order', function () {
    const publYears = Object.keys(publications);
    chai.expect(years).to.be.an('array');

    const sorted = [...new Set(publYears)].sort();
    chai.expect(years).to.deep.equal(sorted);
  });
});
