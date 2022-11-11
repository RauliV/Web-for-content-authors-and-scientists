describe('removeTodoItem(event)', function () {
  const listId = 'test-list';
  const nonExistentId = 'non-existent-id';
  const numberOfInitialItems = 3;
  const itemTextLength = 9;
  let listItemTexts;
  let listElement;

  before(function () {
    listElement = document.getElementById(listId);
  });

  beforeEach(function () {
    listElement.innerHTML = '';
    listItemTexts = generateRandomArray(numberOfInitialItems, itemTextLength);
    listItemTexts.forEach(itemText => addTodoItem(itemText, listId));
  });

  afterEach(function () {
    listElement.innerHTML = '';
  });

  after(function () {
    sinon.restore();
  });

  it('should remove the selected item from the list when delete button is clicked', function (done) {
    const indexOfItem = getRandomNumber(numberOfInitialItems);
    const itemToRemove = listElement.children[indexOfItem];
    const itemText = listItemTexts[indexOfItem];
    const deleteButton = itemToRemove.querySelector('button');
    deleteButton.click();

    // Give the event handler some time to update the DOM
    setTimeout(() => {
      const listItems = listElement.querySelectorAll('li');
      chai
        .expect(listItems.length)
        .to.equal(numberOfInitialItems - 1, 'List item was not properly deleted');
      listItems.forEach(item =>
        chai
          .expect(item.querySelector('span').textContent)
          .to.not.equal(itemText, 'Incorrect list item was deleted')
      );
      done();
    }, 30);
  });

  it('should remove checkbox from the bar chart race area', function (done) {
    const indexOfItem = getRandomNumber(numberOfInitialItems);
    const itemToRemove = listElement.children[indexOfItem];
    const itemText = listItemTexts[indexOfItem];
    const deleteButton = itemToRemove.querySelector('button');
    deleteButton.click();

    // Give the event handler some time to update the DOM
    setTimeout(() => {
      sinon.assert.calledOnce(removeCheckboxStub);
      sinon.assert.calledWith(removeCheckboxStub.firstCall, itemText);
      done();
    }, 30);
  });

  it('should remove select option from the coauthors area', function (done) {
    const indexOfItem = getRandomNumber(numberOfInitialItems);
    const itemToRemove = listElement.children[indexOfItem];
    const itemText = listItemTexts[indexOfItem];
    const deleteButton = itemToRemove.querySelector('button');
    deleteButton.click();

    // Give the event handler some time to update the DOM
    setTimeout(() => {
      sinon.assert.calledOnce(removeSearchStub);
      sinon.assert.calledWith(removeSearchStub.firstCall, itemText);
      done();
    }, 30);
  });
});
