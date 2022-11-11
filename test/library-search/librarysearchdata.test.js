describe('fetchLibrarySearchData(term)', function () {
  const apiUrl = 'https://tie-lukioplus.rd.tuni.fi/cais/api/publ';
  let fetchStub;

  beforeEach(function () {
    const response = new window.Response(JSON.stringify(publicationsData), {
      status: 200,
      headers: { 'Content-type': 'application/json' }
    });

    fetchStub = sinon.stub(window, 'fetch').resolves(response);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should use fetch and return Promise', function () {
    const term = 'C#';
    const returnValue = fetchLibrarySearchData(term);

    sinon.assert.calledOnce(fetchStub);
    chai
      .expect(returnValue)
      .to.be.instanceof(
        Promise,
        `fetchLibrarySearchData() should use fetch and return a promise but it returned ${typeof returnValue} instead.`
      );
  });

  it('should add search term correctly to the library search URL', async function () {
    const term = 'C#';
    const searchData = await fetchLibrarySearchData(term);
    const expectedUrl = new URL(apiUrl);
    expectedUrl.searchParams.set('q', term);

    sinon.assert.calledOnce(fetchStub);
    const args = fetchStub.firstCall.args;

    const actualUrlString = args[0] instanceof URL ? args[0].toString() : `${args[0]}`;

    chai
      .expect(actualUrlString)
      .to.equal(
        expectedUrl.toString(),
        `Expected a call to ${expectedUrl.toString()} but received call to ${actualUrlString} instead.`
      );
  });

  it('should return Promise which resolves to publication data', async function () {
    const term = 'C#';
    const returnValue = fetchLibrarySearchData(term);

    sinon.assert.calledOnce(fetchStub);
    chai
      .expect(returnValue)
      .to.be.instanceof(
        Promise,
        `fetchLibrarySearchData() should use fetch and return a promise but it returned ${typeof returnValue} instead.`
      );

    const returnedData = await returnValue;
    chai
      .expect(returnedData)
      .to.deep.equal(
        publicationsData,
        'fetchLibrarySearchData() returned incorrect publications data.'
      );
  });
});
