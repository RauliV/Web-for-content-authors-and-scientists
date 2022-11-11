describe('initCoauthors(coauthorsFormId, coauthorsSelectElementId, coauthorsTableAreaId)', function () {
  const apiUrl = 'https://tie-lukioplus.rd.tuni.fi/cais/api/publ';
  const formId = 'test-form';
  const selectId = 'test-select';
  const tableAreaId = 'test-table';
  const numberOfInitialOptions = 3;
  const optionLength = 9;
  let selectElement;
  let searchTerms;
  let formElement;
  let fetchStub;
  let addListenerStub;
  let submitHandler;

  const submitWrapper = function (callback) {
    return function (e) {
      callback(e);
      if (!e.defaultPrevented) {
        e.preventDefault();
        throw new Error('Submit handler should prevent default action!');
      }
    };
  };

  const callInitCoauthors = function () {
    addListenerStub.callsFake(function (eventType, callback) {
      submitHandler = submitWrapper(callback);
      addListenerStub.wrappedMethod.call(formElement, eventType, submitHandler);
    });

    initCoauthors(formId, selectId, tableAreaId);

    if (!addListenerStub.called) {
      if (typeof formElement.onsubmit === 'function') {
        const handlerFunction = formElement.onsubmit;
        formElement.onsubmit = null;
        formElement.addEventListener('submit', handlerFunction);
      }

      throw new Error('Form is missing a listener for submit event');
    }
  };

  before(function () {
    formElement = document.getElementById(formId);
    selectElement = document.getElementById(selectId);
    selectElement.innerHTML = '';

    searchTerms = generateRandomArray(numberOfInitialOptions, optionLength);
    searchTerms.forEach(term => {
      const option = document.createElement('option');
      option.value = term;
      option.textContent = term;
      selectElement.append(option);
    });
  });

  beforeEach(function () {
    const response = new window.Response(JSON.stringify(publicationsData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    fetchStub = sinon.stub(window, 'fetch').resolves(response);
    addListenerStub = sinon.stub(formElement, 'addEventListener');
  });

  afterEach(function () {
    formElement.removeEventListener('submit', submitHandler);
    fetchStub.restore();
    addListenerStub.restore();
  });

  after(function () {
    sinon.restore();
    selectElement.innerHTML = '';
  });

  it('should attach submit handler to the form', function () {
    callInitCoauthors();
    sinon.assert.calledOnce(addListenerStub);
    sinon.assert.calledWith(addListenerStub.firstCall, 'submit');
  });

  it('should prevent default action when form is submitted', function () {
    callInitCoauthors();
    sinon.assert.calledOnce(addListenerStub);
    chai
      .expect(
        () => formElement.requestSubmit(),
        'Remember to prevent default action inside submit handler.'
      )
      .to.not.throw();
  });

  it('should fetch search results based on the selected option', function () {
    callInitCoauthors();
    const options = selectElement.querySelectorAll('option');
    options[numberOfInitialOptions - 1].selected = true;
    formElement.requestSubmit();

    const expectedUrl = new URL(apiUrl);
    expectedUrl.searchParams.set('q', searchTerms[numberOfInitialOptions - 1]);

    sinon.assert.called(fetchStub);
    const args = fetchStub.lastCall.args;
    const actualUrlString = args[0] instanceof URL ? args[0].toString() : `${args[0]}`;

    chai
      .expect(actualUrlString)
      .to.equal(
        expectedUrl.toString(),
        'Use the selected option as the search term for library data'
      );
  });

  it('should correctly update DOM and add publications to table when form is submitted', function (done) {
    callInitCoauthors();
    const options = selectElement.querySelectorAll('option');
    options[numberOfInitialOptions - 1].selected = true;
    formElement.requestSubmit();

    const expectedRows = publicationsData
      .reduce((rows, publ) => {
        if (!('authors' in publ)) return rows;
        const { year, title } = publ;
        const authors = Array.isArray(publ.authors.author)
          ? publ.authors.author
          : [publ.authors.author];
        const [firstAuthor, ...coAuthors] = authors.map(author => author.text);
        const expectedRow = [year, title, firstAuthor, coAuthors.join(', ')].map(convertEntities);
        rows.push(expectedRow);
        return rows;
      }, [])
      .sort((a, b) => a[0].toString().localeCompare(b[0].toString()));

    // Timeout needed to let submit handler to fetch data and the promise to resolve.
    // There is no way of awaiting submit handler and without timeout tests are
    // run before the promise resolves and the handler has a chance to update the DOM
    setTimeout(function () {
      const tableRows = document.querySelectorAll(`#${tableAreaId} table tr`);
      chai.expect(tableRows.length).to.equal(expectedRows.length + 1, '');

      Array.from(tableRows)
        .slice(1)
        .forEach((row, i) => {
          const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent);
          chai
            .expect(rowData)
            .to.deep.equal(
              expectedRows[i],
              `Table row ${i + 1}: "${JSON.stringify(expectedRows[i])}" !== "${JSON.stringify(
                rowData
              )}"`
            );
        });
      done();
    }, 500);
  });
});
