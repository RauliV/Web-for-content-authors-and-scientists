describe('getCheckedItems(techsCheckboxAreaId)', function () {
  const getRand = upperBound => Math.floor(Math.random() * upperBound);
  const TECHNOLOGIES = ['JavaScript', 'Angular', 'React', 'Python', 'Java', 'C++', 'Swift'];
  const BCR_CHECKBOX_AREA_ID = 'bcr-techs-checkbox';
  const BCR_SECTION_ID = 'bcr-section';
  // Save initial DOM state
  const defaultHTML = document.getElementById(BCR_SECTION_ID).innerHTML;
  let randItemArr = [];
  before(function () {
    let randIndex;

    // Refresh DOM state to initial state
    document.getElementById(BCR_SECTION_ID).innerHTML = defaultHTML;
    // copy techs
    let techArr = TECHNOLOGIES;

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

  it('should get selected items', function () {
    // copy the added item names
    let expectedResultArr = [...randItemArr];
    // remove a random item
    expectedResultArr.splice(getRand(expectedResultArr.length), 1);

    // Get checkbox container
    const checkBoxContainer = document.getElementById(BCR_CHECKBOX_AREA_ID);

    // Deselect all checkboxes
    Array.from(checkBoxContainer.querySelectorAll("input[type='checkbox']")).map(
      checkbox => (checkbox.checked = false)
    );

    // Set the checked property of the selectedTechs to true
    expectedResultArr.map(tech => {
      // loop through the items to be checked
      Array.from(checkBoxContainer.querySelectorAll('div')).map(div => {
        // loop through the divs
        if (div.querySelector('label').textContent === tech)
          // check if the div label text content matches the tech
          div.querySelector("input[type='checkbox']").checked = true; // Check the checkbox
      });
    });
    // run student's code
    const resultArr = getCheckedItems(BCR_CHECKBOX_AREA_ID);

    // Check that student's func returns an array
    chai.expect(resultArr).to.be.an('array', 'getCheckedItems() should return an array');

    // Check that the result length is correct
    chai
      .expect(resultArr.length)
      .to.equal(expectedResultArr.length, 'The returned array has an incorrect number of items');

    // loop through expected result and assert that they are all present in student's result
    expectedResultArr.map(expectedResult => {
      chai
        .expect(resultArr.map(item => item.toLowerCase()))
        .to.include(
          expectedResult.toLowerCase(),
          'The returned array does not have a required item'
        );
    });
  });
});
