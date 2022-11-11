describe('fetchSOFData(technologies)', function () {
  const apiUrl = 'https://tie-lukioplus.rd.tuni.fi/cais/api/stackoverflow/stats';
  const techArr = ['JavaScript', 'Java', 'PHP', 'Python', 'C++'];
  let fetchStub;

  beforeEach(function () {
    const response = new window.Response(JSON.stringify(SOFData), {
      status: 200,
      headers: { 'Content-type': 'application/json' }
    });

    fetchStub = sinon.stub(window, 'fetch').resolves(response);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should use fetch and return Promise', function () {
    const returnValue = fetchSOFData(techArr);

    sinon.assert.calledOnce(fetchStub);
    chai
      .expect(returnValue)
      .to.be.a(
        'promise',
        `fetchSOFData() should use fetch and return a promise but it returned ${typeof returnValue} instead.`
      );
  });

  it('should add search term correctly to the library search URL', async function () {
    fetchSOFData(techArr);
    const expectedUrl = new URL(apiUrl);
    expectedUrl.searchParams.set('tech', techArr.join(';'));

    const args = fetchStub.firstCall.args;

    const actualUrlString = args[0] instanceof URL ? args[0].toString() : `${args[0]}`;

    chai
      .expect(actualUrlString)
      .to.equal(
        expectedUrl.toString(),
        `Expected a call to ${expectedUrl.toString()} but received call to ${actualUrlString} instead.`
      );
  });

  it('should resolves to stack overflow data', async function () {
    const returnValue = fetchSOFData(techArr);

    const returnedData = await returnValue;
    chai
      .expect(returnedData)
      .to.deep.equal(SOFData, 'fetchSOFData() returned incorrect stack overflow data.');
  });
});
