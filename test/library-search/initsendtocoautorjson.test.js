describe('initSendToCoauthorjson(coauthorsjsonBtnId, coauthorsSelectElementId, coauthorsjsonIframeId)', function () {
  const buttonId = 'test-form';
  const iFrameId = 'test-iframe';
  const selectId = 'test-select';
  const nonExistentId = 'non-existent-id';
  const numberOfInitialOptions = 3;
  const optionLength = 9;
  let buttonElement;
  let iFrameElement;
  let selectElement;
  let searchTerms;
  let receivedMsg;
  let addListenerStub;
  let clickHandler;

  const msgListener = function (e) {
    receivedMsg = e.data || undefined;
  };

  before(function () {
    buttonElement = document.getElementById(buttonId);
    iFrameElement = document.getElementById(iFrameId);
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
    receivedMsg = null;
    window.addEventListener('message', msgListener);
    addListenerStub = sinon.stub(buttonElement, 'addEventListener');
    addListenerStub.callsFake(function (eventType, callback) {
      clickHandler = callback;
      addListenerStub.wrappedMethod.call(buttonElement, eventType, clickHandler);
    });
  });

  afterEach(function () {
    buttonElement.removeEventListener('click', clickHandler);
    addListenerStub.restore();
    window.removeEventListener('message', msgListener);
  });

  after(function () {
    selectElement.innerHTML = '';
  });

  it('should throw an error if button ID does not exist in the DOM', function () {
    chai.expect(() => initSendToCoauthorjson(nonExistentId, selectId, iFrameId)).to.throw();
  });

  it('should attach an event listener on the button click event', function () {
    initSendToCoauthorjson(buttonId, selectId, iFrameId);
    sinon.assert.calledOnce(addListenerStub);
    sinon.assert.calledWith(addListenerStub.firstCall, 'click');
  });

  it('should send currently selected term as message to the iframe when button is clicked', function (done) {
    initSendToCoauthorjson(buttonId, selectId, iFrameId);
    const options = selectElement.querySelectorAll('option');
    options[numberOfInitialOptions - 1].selected = true;
    buttonElement.click();
    sinon.assert.calledOnce(addListenerStub);

    // Give the event loop some time to process all events before trying to check the results
    setTimeout(function () {
      chai
        .expect(receivedMsg)
        .to.equal(
          selectElement.value,
          'Currently selected search term was not correctly sent to the iframe'
        );
      done();
    }, 250);
  });
});
