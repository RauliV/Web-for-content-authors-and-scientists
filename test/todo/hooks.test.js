/**
 * Global test hooks for all todo tests
 *
 * Create test fakes for all the external functions which todo needs to call.
 * Fakes make it is possible to assert that each of the functions are called
 * properly and with correct arguments.
 */

let addCheckboxStub;
let addSearchStub;
let removeCheckboxStub;
let removeSearchStub;

beforeEach(function () {
  addCheckboxStub = sinon.fake();
  addSearchStub = sinon.fake();
  removeCheckboxStub = sinon.fake();
  removeSearchStub = sinon.fake();

  window.addCheckboxItem = addCheckboxStub;
  window.addSearchOption = addSearchStub;
  window.removeCheckboxItem = removeCheckboxStub;
  window.removeSearchOption = removeSearchStub;
});

afterEach(function () {
  delete window.addCheckboxItem;
  delete window.addSearchOption;
  delete window.removeCheckboxItem;
  delete window.removeSearchOption;
});
