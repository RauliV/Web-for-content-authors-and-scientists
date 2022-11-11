describe('formatSOFData(data, technologies)', function () {
  const TECH_ARR = ['JavaScript', 'Java', 'PHP', 'Python', 'C++'];
  let fetchStub = null;
  let randTechArr = [];
  const getRand = upperBound => Math.floor(Math.random() * upperBound);
  beforeEach(function () {
    // Create a the default response
    const response = new window.Response(JSON.stringify(SOFData), {
      status: 200,
      headers: { 'Content-type': 'application/json' }
    });

    // Set the default response of fetch request to the created response
    fetchStub = sinon.stub(window, 'fetch').resolves(response);

    let techArr = [...TECH_ARR];
    let randIndex = 0;
    randTechArr = [];

    // Get 3 random techs from tech list

    randIndex = getRand(techArr.length);
    randTechArr.push(techArr[randIndex]);
    techArr.splice(randIndex, 1);

    randIndex = getRand(techArr.length);
    randTechArr.push(techArr[randIndex]);
    techArr.splice(randIndex, 1);

    randIndex = getRand(techArr.length);
    randTechArr.push(techArr[randIndex]);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should return an array', async function () {
    // Fetch data
    const resData = await fetchSOFData(TECH_ARR);

    // Format data
    const result = formatSOFData(resData, randTechArr);

    // Ensure that fetch was called onse
    sinon.assert.calledOnce(fetchStub);

    // Assert that the formated data is an array
    chai
      .expect(result)
      .to.be.an(
        'array',
        `formatSOFData() should return an Array but it returned ${typeof returnValue} instead.`
      );
  });

  it('should format data got from the SOF endpoint based on the technologies', async function () {
    // Fetch data
    const resData = await fetchSOFData(TECH_ARR);

    // Format data
    const result = formatSOFData(resData, randTechArr);

    // Get expected result based on techs passed to the formatSOFData()
    const expectedArr = randTechArr.map(randTech => formattedSOFData[TECH_ARR.indexOf(randTech)]);

    // Spread the expected result
    const expectedResult = [...expectedArr[0], ...expectedArr[1], ...expectedArr[2]];

    // Assert the the result length is correct
    chai
      .expect(result.length)
      .to.equal(expectedResult.length, 'The length of your array is incorrect');

    // Assert that each item in the expected result is also in the result returned from formatSOFData(resData, randTechArr)
    expectedResult.map(data => {
      chai
        .expect(result)
        .to.deep.include(data, 'One or more of your data is incorrect or missing. Expected format {name: String, year: Number, value: Number, lastValue: Number}. name property must be as provided.');
    });
  });
});
