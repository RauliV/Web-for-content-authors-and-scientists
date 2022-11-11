describe('initTodo(todoFormId = "todo-form", todoInputId = "todo-input", todoListId = "todo-list")', function () {
  const formId = 'test-form';
  const inputId = 'test-input';
  const listId = 'test-list';
  const nonExistentId = 'non-existent-id';
  let formElement;
  let inputElement;
  let listElement;
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

  const callInitTodo = function () {
    addListenerStub.callsFake(function (eventType, callback) {
      submitHandler = submitWrapper(callback);
      addListenerStub.wrappedMethod.call(formElement, eventType, submitHandler);
    });

    initTodo(formId, inputId, listId);

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
    inputElement = document.getElementById(inputId);
    listElement = document.getElementById(listId);
  });

  beforeEach(function () {
    addListenerStub = sinon.stub(formElement, 'addEventListener');
    listElement.innerHTML = '';
  });

  afterEach(function () {
    formElement.removeEventListener('submit', submitHandler);
    formElement.reset();
    addListenerStub.restore();
  });

  after(function () {
    listElement.innerHTML = '';
    inputElement.value = '';
    sinon.restore();
  });

  it('should throw an error if form ID does not exist in the DOM', function () {
    chai.expect(() => initTodo(nonExistentId, inputId, listId)).to.throw();
  });

  it('should attach submit handler to the form', function () {
    callInitTodo();
    sinon.assert.calledOnce(addListenerStub);
    sinon.assert.calledWith(addListenerStub.firstCall, 'submit');
  });

  it('should prevent default action when form is submitted', function () {
    callInitTodo();
    sinon.assert.calledOnce(addListenerStub);
    chai
      .expect(
        () => formElement.requestSubmit(),
        'Remember to prevent default action inside submit handler.'
      )
      .to.not.throw();
  });

  it('should not add anything to the list if text input is empty when form is submitted', function (done) {
    callInitTodo();
    formElement.requestSubmit();

    // Give the submit handler some time to update the DOM
    setTimeout(() => {
      const listItems = listElement.querySelectorAll('li');
      chai.expect(listItems.length).to.be.equal(0, 'Empty items should not be added to the list');
      done();
    }, 30);
  });

  it('should add new item to list when form is submitted', function (done) {
    callInitTodo();
    const newItemText = generateRandomString();
    inputElement.value = newItemText;
    formElement.requestSubmit();

    // Give the submit handler some time to update the DOM
    setTimeout(() => {
      const listItems = listElement.querySelectorAll('li');
      chai.expect(listItems.length).to.be.equal(1, 'Item was not correctly added to the list');
      chai
        .expect(listItems[0].querySelector('span').textContent)
        .to.equal(newItemText, 'New was item added but its text is incorrect');
      done();
    }, 30);
  });
});
