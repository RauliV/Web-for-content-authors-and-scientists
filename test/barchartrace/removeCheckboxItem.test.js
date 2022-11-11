describe('removeCheckboxItem(text, techsCheckboxAreaId)', function () {
  const getRand = upperBound => Math.floor(Math.random() * upperBound);
  const TECHNOLOGIES = ['JavaScript', 'Angular', 'React', 'Python', 'Java', 'C++', 'Swift'];
  const BCR_CHECKBOX_AREA_ID = 'bcr-techs-checkbox';
  const TODO_LIST_ID = 'todo-list';

  // Save initial DOM state
  const TEST_AREA_ID = 'test-area';
  const defaultHTML = document.getElementById(TEST_AREA_ID).innerHTML;
  let randItemArr = [];
  beforeEach(function () {
    let randIndex;

    // Refresh DOM state to initial state
    document.getElementById(TEST_AREA_ID).innerHTML = defaultHTML;

    // copy techs
    let techArr = [...TECHNOLOGIES];
    randItemArr = [];

    // Add 3 random terms
    randIndex = getRand(techArr.length);
    // Run student's add checkbox function
    addCheckboxItem(techArr[randIndex]);
    // Save the added item name
    randItemArr.push(techArr[randIndex]);
    // remove added tech from array
    techArr.splice(randIndex, 1);

    randIndex = getRand(techArr.length);
    // Run student's add checkbox function
    addCheckboxItem(techArr[randIndex]);
    // Save the added item name
    randItemArr.push(techArr[randIndex]);
    // remove added tech from array
    techArr.splice(randIndex, 1);

    randIndex = getRand(techArr.length);
    // Run student's add checkbox function
    addCheckboxItem(techArr[randIndex]);
    // Save the added item name
    randItemArr.push(techArr[randIndex]);
  });

  it('Should remove added element by text', function () {
    // Get checkbox container
    const checkBoxContainer = document.getElementById(BCR_CHECKBOX_AREA_ID);

    //Check that all items where added
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(3, 'Checkbox divs where not added correctly');

    // Get a random index for test
    const randItemIndex = getRand(checkBoxContainer.childElementCount);

    // Get ref to the child object to be
    const checkBoxDiv = checkBoxContainer.children[randItemIndex];

    // Run student's add checkbox function to remove the randomly selected item
    removeCheckboxItem(randItemArr[randItemIndex]);

    // Check that element an item was removed
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(2, 'a checkbox div was not removed from container');

    // Check that the specified div was removed
    chai
      .expect(checkBoxDiv.parentElement)
      .to.be.a('null', 'The specified checkbox div was not removed');
  });

  it('Should remove added element via Todo', function () {
    // Get checkbox container
    const checkBoxContainer = document.getElementById(BCR_CHECKBOX_AREA_ID);

    //Check that all items where added
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(3, 'Checkbox divs where not added correctly');

    // remove all items
    randItemArr.map(randItem => removeCheckboxItem(randItem));

    // Check that all items where removed
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(0, 'Checkbox divs where not removed correctly');

    console.log(randItemArr);

    // Run the student's add function
    randItemArr.map(item => addTodoItem(item, TODO_LIST_ID));

    // Check that all items where added via todo
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(3, 'Checkbox divs where not added correctly via Todo');

    // Get a random index for element removal
    const randItemIndex = getRand(checkBoxContainer.childElementCount);

    // Save ref to DOM list object
    const todoList = document.getElementById(TODO_LIST_ID);

    // Selects a random list item element  to be deleted from list
    const li = todoList.children[randItemIndex];

    // Get ref to the child object to be deleted
    const checkBoxDiv = checkBoxContainer.children[randItemIndex];

    console.log(li);
    console.log(checkBoxDiv);

    // Get ref to the delete button
    const deleteBtn = li.querySelector('button');

    // Click the delete button
    deleteBtn.dispatchEvent(new Event('click'));

    // Check that element an item was removed
    chai
      .expect(checkBoxContainer.childElementCount)
      .to.equal(2, 'a checkbox div was not removed from container');

    // Check that the specified div was removed
    chai
      .expect(checkBoxDiv.parentElement)
      .to.be.a('null', 'The specified checkbox div was not removed');
  });
});
