describe('getPublications(publicationsData)', function () {
  let publications;

  beforeEach(function () {
    publications = getPublications(publicationsData);
  });

  it('should return a non-empty object', function () {
    chai.expect(publications).to.be.an('object');
    chai.expect(publications).to.not.be.empty;
  });

  it('should return an object with years as keys', function () {
    const keyRegex = /^[12][0-9]{3}$/;

    chai.expect(publications).to.be.an('object');
    chai.expect(Object.keys(publications).every(key => keyRegex.test(key))).to.be.true;
  });

  it('should return an object where under each year the value is a non-empty array', function () {
    chai.expect(publications).to.be.an('object');

    Object.keys(publications).forEach(year => {
      chai.expect(publications[year]).to.be.an('array');
      chai.expect(publications[year]).to.not.be.empty;
    });
  });

  it('should return an object where each publication object has title, authors, and year', function () {
    chai.expect(publications).to.be.an('object');

    Object.keys(publications).forEach(year => {
      publications[year].forEach(publ => {
        chai.expect(publ).to.be.an('object');
        chai.expect(publ).to.have.all.keys('title', 'authors', 'year');
      });
    });
  });

  it("should return an object where each publication's authors property is a non-empty array", function () {
    chai.expect(publications).to.be.an('object');

    Object.keys(publications).forEach(year => {
      publications[year].forEach(publ => {
        chai.expect(publ).to.be.an('object');
        chai.expect(publ).to.have.any.keys('authors');
        chai.expect(publ.authors).to.be.an('array');
        chai.expect(publ.authors).to.not.be.empty;
      });
    });
  });
});
