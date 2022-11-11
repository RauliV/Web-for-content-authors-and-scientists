describe('addSearchOption(term, coauthorsSelectElementId = "coauthors-select-term")', function () {
  const selectId = 'test-select';
  let selectElement;

  before(function () {
    selectElement = document.getElementById(selectId);
  });

  beforeEach(function () {
    selectElement.innerHTML = '';
  });

  after(function () {
    selectElement.innerHTML = '';
  });

  it('should throw an error if select ID does not exist in the dom', function () {
    const searchTerm = generateRandomString();
    chai.expect(() => addSearchOption(searchTerm)).to.throw();
  });

  it('should not add option when term is undefined', function () {
    addSearchOption(undefined, selectId);
    chai.expect(selectElement.innerHTML, 'Do not add option when term is undefined').to.be.empty;
  });

  it('should not add option when term is null', function () {
    addSearchOption(null, selectId);
    chai.expect(selectElement.innerHTML, 'Do not add option when term is null').to.be.empty;
  });

  it('should not add option when term is empty string', function () {
    addSearchOption('', selectId);
    chai.expect(selectElement.innerHTML, 'Do not add option when term empty string').to.be.empty;
  });

  it('should add new option with non-empty term and correct select ID', function () {
    const searchTerm = generateRandomString();
    addSearchOption(searchTerm, selectId);

    const options = selectElement.querySelectorAll('option');
    chai
      .expect(options.length)
      .to.equal(1, 'Tried to add non-empty option and expected to find one option');
    chai
      .expect(options[0].value)
      .to.equal(
        searchTerm,
        `Tried to add option "${searchTerm}" and option value should equal "${searchTerm}"`
      );
    chai
      .expect(options[0].textContent)
      .to.equal(
        searchTerm,
        `Tried to add option "${searchTerm}" and option text should equal "${searchTerm}"`
      );
  });

  it('should add new option to the end of the select list', function () {
    const firstTerm = generateRandomString();
    const secondTerm = generateRandomString();
    addSearchOption(firstTerm, selectId);
    addSearchOption(secondTerm, selectId);

    const options = selectElement.querySelectorAll('option');
    chai
      .expect(options.length)
      .to.equal(2, 'Tried to add two non-empty options and expected to find two options');
    chai
      .expect([firstTerm, secondTerm])
      .to.deep.equal(
        [options[0].value, options[1].value],
        `Tried to add options "${firstTerm}" and "${secondTerm}". Expected to have two options in that same order.`
      );
  });
});
