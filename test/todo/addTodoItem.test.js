describe('addTodoItem(text, listId)', function () {
  const listId = 'test-list';
  const nonExistentId = 'non-existent-id';
  let listElement;
  let addListenerStub;

  before(function () {
    listElement = document.getElementById(listId);
  });

  beforeEach(function () {
    listElement.innerHTML = '';
    addListenerStub = sinon.fake();
    HTMLButtonElement.prototype.addEventListener = addListenerStub;
  });

  afterEach(function () {
    delete HTMLButtonElement.prototype.addEventListener;
  });

  after(function () {
    listElement.innerHTML = '';
    sinon.restore();
  });

  it('should throw an error if list ID does not exist in the DOM', function () {
    chai.expect(() => addTodoItem(generateRandomString(), nonExistentId)).to.throw();
  });

  it('should correctly add new item to list', function () {
    const itemText = generateRandomString();
    addTodoItem(itemText, listId);
    const listItems = listElement.querySelectorAll('li');
    chai.expect(listItems.length).to.equal(1, 'List has an incorrect number of items');
  });

  it('should correctly add new item with text and delete button to the list', function () {
    const itemText = generateRandomString();
    addTodoItem(itemText, listId);

    const spanElements = listElement.querySelectorAll('li > span');
    const buttonElements = listElement.querySelectorAll('li > button');

    chai
      .expect(spanElements.length)
      .to.equal(1, 'List should only have one item with one span and button, span is missing');
    chai
      .expect(buttonElements.length)
      .to.equal(1, 'List should only have one item with one span and button, button is missing');
  });

  it('should correctly add list item with content matching provided text', function () {
    const itemText = generateRandomString();
    addTodoItem(itemText, listId);

    const spanElements = listElement.querySelectorAll('li > span');

    chai.expect(spanElements.length).to.equal(1, 'List should only have one item with one span');
    chai
      .expect(spanElements[0].textContent)
      .to.equal(itemText, 'Text content of the span element is incorrect');
  });

  it('should attach an event handler on the click event of the delete button', function () {
    const itemText = generateRandomString();
    addTodoItem(itemText, listId);
    sinon.assert.calledOnceWithExactly(addListenerStub, 'click', removeTodoItem);
  });

  it('should add new checkbox to the bar chart race area', function () {
    const itemText = generateRandomString();
    addTodoItem(itemText, listId);
    sinon.assert.calledOnce(addCheckboxStub);
    sinon.assert.calledWith(addCheckboxStub.firstCall, itemText);
  });

  it('should add new select option to the coauthors area', function () {
    const itemText = generateRandomString();
    addTodoItem(itemText, listId);
    sinon.assert.calledOnce(addSearchStub);
    sinon.assert.calledWith(addSearchStub.firstCall, itemText);
  });
});
