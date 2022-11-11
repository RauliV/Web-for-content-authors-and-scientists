describe('removeSearchOption(term, coauthorsSelectElementId = "coauthors-select-term")', function () {
  const selectId = 'test-select';
  const numberOfInitialOptions = 3;
  const optionLength = 9;
  let selectElement;
  let searchTerms;

  before(function () {
    selectElement = document.getElementById(selectId);
    selectElement.innerHTML = '';
  });

  beforeEach(function () {
    searchTerms = generateRandomArray(numberOfInitialOptions, optionLength);
    searchTerms.forEach(term => {
      const option = document.createElement('option');
      option.value = term;
      option.textContent = term;
      selectElement.append(option);
    });
  });

  afterEach(function () {
    selectElement.innerHTML = '';
  });

  it('should throw an error if select ID does not exist in the DOM', function () {
    chai.expect(() => removeSearchOption(searchTerms[0])).to.throw();
  });

  it('should not throw an error if the select does not have any options', function () {
    selectElement.innerHTML = '';
    chai.expect(() => removeSearchOption(searchTerms[0], selectId)).to.not.throw();
    chai.expect(selectElement.innerHTML).to.be.empty;
  });

  it('should not remove anything if term is undefined', function () {
    removeSearchOption(undefined, selectId);
    const options = selectElement.querySelectorAll('option');
    chai
      .expect(options.length)
      .to.equal(numberOfInitialOptions, 'Do not remove any option if term is undefined');
    chai
      .expect(Array.from(options).map(option => option.value))
      .to.deep.equal(
        searchTerms,
        'Option list should have all the original options left untouched'
      );
  });

  it('should not remove anything if term is null', function () {
    removeSearchOption(null, selectId);
    const options = selectElement.querySelectorAll('option');
    chai
      .expect(options.length)
      .to.equal(numberOfInitialOptions, 'Do not remove any option if term is null');
    chai
      .expect(Array.from(options).map(option => option.value))
      .to.deep.equal(
        searchTerms,
        'Option list should have all the original options left untouched'
      );
  });

  it('should not remove anything if term does not equal any of the options', function () {
    const nonExistentTerm = generateRandomString(optionLength + 1); // longer option guaranteed not to exist
    removeSearchOption(nonExistentTerm, selectId);
    const options = selectElement.querySelectorAll('option');
    chai
      .expect(options.length)
      .to.equal(
        numberOfInitialOptions,
        'Do not remove any option if term does not equal any of the options'
      );
    chai
      .expect(Array.from(options).map(option => option.value))
      .to.deep.equal(
        searchTerms,
        'Option list should have all the original options left untouched'
      );
  });

  it('should remove only the option matching the term.', function () {
    removeSearchOption(searchTerms[0], selectId);
    const options = selectElement.querySelectorAll('option');
    chai
      .expect(options.length)
      .to.equal(numberOfInitialOptions - 1, 'Remove the option which matches the term');
    chai
      .expect(Array.from(options).map(option => option.value))
      .to.deep.equal(
        searchTerms.slice(1),
        'Option list should not include the option which matches the term'
      );
  });
});
