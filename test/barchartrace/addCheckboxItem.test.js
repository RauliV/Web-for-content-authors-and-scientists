describe('addCheckboxItem(text, techsCheckboxAreaId)', function () {
  const getRand = upperBound => Math.floor(Math.random() * upperBound);

  const TECHNOLOGIES = ['JavaScript', 'Angular', 'React', 'Python', 'Java', 'C++', 'Swift'];

  const BCR_CHECKBOX_AREA_ID = 'bcr-techs-checkbox';

  const TODO_LIST_ID = 'todo-list';
  // Save initial DOM state
  const TEST_AREA_ID = 'test-area';
  const defaultHTML = document.getElementById(TEST_AREA_ID).innerHTML;

  let randItem = null;
  beforeEach(function () {
    // Refresh DOM state to initial state
    document.getElementById(TEST_AREA_ID).innerHTML = defaultHTML;
    // Get a random technology
    randItem = TECHNOLOGIES[getRand(TECHNOLOGIES.length)];
  });

  it('should add checkbox div elements', async function () {
    // Get checkbox container
    const checkBoxContainer = document.getElementById(BCR_CHECKBOX_AREA_ID);
    // Check that checkbox div is empty before test
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(0, 'Checkbox container should be empty');
    // Run student's add checkbox function
    addCheckboxItem(randItem);
    // Check that checkbox container now has one child
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(1, 'Checkbox container has incorrect number of children');
    // Get ref to the child objcet
    const checkBoxDiv = checkBoxContainer.lastElementChild;
    // Check that the child is a div
    chai
      .expect(checkBoxDiv.tagName.toLowerCase())
      .to.equal('div', 'direct child element of checkbox container is incorrect');
  });

  it('checkbox div should contain a label and input', function () {
    // Get checkbox container
    const checkBoxContainer = document.getElementById(BCR_CHECKBOX_AREA_ID);
    // Run student's add checkbox function
    addCheckboxItem(randItem);
    // Get ref to the child objcet
    const checkBoxDiv = checkBoxContainer.lastElementChild;

    // Check that the div has two children
    chai
      .expect(checkBoxDiv.childElementCount)
      .to.equal(
        2,
        'Checkbox div has incorrect number of children element, expects only input and label elements'
      );

    // Save ref to input
    const input = checkBoxDiv.querySelector('input');

    // Save ref to label
    const label = checkBoxDiv.querySelector('label');

    // Check that input exist
    chai.expect(input).to.not.be.a('null', 'input element is not found as checkbox diect child');

    // check that label exist
    chai.expect(label).to.not.be.a('null', 'labe element is not found as checkbox diect child');
  });

  it('label should match text', function () {
    // Get checkbox container
    const checkBoxContainer = document.getElementById(BCR_CHECKBOX_AREA_ID);
    // Run student's add checkbox function
    addCheckboxItem(randItem);
    // Get ref to the child objcet
    const checkBoxDiv = checkBoxContainer.lastElementChild;

    // Save ref to label
    const label = checkBoxDiv.querySelector('label');

    // check that label exist
    chai.expect(label).to.not.be.a('null', 'labe element is not found as checkbox diect child');

    // check that label has correct text content
    chai.expect(label.textContent).to.equal(randItem, 'label has an incorrect text content');
  });

  it('input should be a checkbox', async function () {
    // Get checkbox container
    const checkBoxContainer = document.getElementById(BCR_CHECKBOX_AREA_ID);
    // Run student's add checkbox function
    addCheckboxItem(randItem);
    // Get ref to the child objcet
    const checkBoxDiv = checkBoxContainer.lastElementChild;

    // Save ref to input
    const input = checkBoxDiv.querySelector('input');

    // Check that input exist
    chai.expect(input).to.not.be.a('null', 'input element is not found as checkbox diect child');

    // check that input is a checkbox
    chai
      .expect(input.getAttribute('type').toLowerCase())
      .to.equal('checkbox', 'input is not a checkbox');
  });

  it('should add checkbox div elements via Todo', async function () {
    // Get checkbox container
    const checkBoxContainer = document.getElementById(BCR_CHECKBOX_AREA_ID);

    // Run the student's add function
    addTodoItem(randItem, TODO_LIST_ID);

    // Check that checkbox container now has one child
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(1, 'Checkbox container has incorrect number of children');
    // Get ref to the child objcet
    const checkBoxDiv = checkBoxContainer.lastElementChild;
    // Check that the child is a div
    chai
      .expect(checkBoxDiv.tagName.toLowerCase())
      .to.equal('div', 'direct child element of checkbox container is incorrect');

    // Save ref to input
    const input = checkBoxDiv.querySelector('input');

    // Save ref to label
    const label = checkBoxDiv.querySelector('label');

    // Check that input exist
    chai.expect(input).to.not.be.a('null', 'input element is not found as checkbox diect child');

    // check that label exist
    chai.expect(label).to.not.be.a('null', 'labe element is not found as checkbox diect child');

    // check that input is a checkbox
    chai
      .expect(input.getAttribute('type').toLowerCase())
      .to.equal('checkbox', 'input is not a checkbox');

    // check that label has correct text content
    chai.expect(label.textContent).to.equal(randItem, 'label has an incorrect text content');
  });
});
