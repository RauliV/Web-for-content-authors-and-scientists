describe('getSearchOption(coauthorsSelectElementId = "coauthors-select-term")', function () {
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
    chai.expect(() => getSearchOption()).to.throw();
  });

  it('should return empty string when the select is empty and there are no options', function () {
    selectElement.innerHTML = '';
    const selectedOption = getSearchOption(selectId);
    chai.expect(selectedOption).to.be.a('string');
    chai.expect(selectedOption).to.be.empty;
  });

  it('should return correct value when one option is selected', function () {
    const options = selectElement.querySelectorAll('option');
    options[numberOfInitialOptions - 1].selected = true;

    const selectedOption = getSearchOption(selectId);
    chai.expect(selectedOption).to.be.a('string');
    chai.expect(selectedOption).to.equal(searchTerms[numberOfInitialOptions - 1]);
  });
});
