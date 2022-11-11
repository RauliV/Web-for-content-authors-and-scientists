(function () {
  const TECHNOLOGIES = ['JavaScript', 'Angular', 'React', 'Python', 'Java', 'C++', 'Swift'];

  const TODO_INPUT_ID = 'todo-input';
  const TODO_FORM_ID = 'todo-form';
  const TODO_LIST_ID = 'todo-list';

  const BCR_AREA_ID = 'bar-chart-race';
  const BCR_CHECKBOX_AREA_ID = 'bcr-techs-checkbox';
  const BCR_START_BTN_ID = 'bar-chart-race-start';

  const COAUTHORS_SELECT_ELEMENT_ID = 'coauthors-select-term';
  const COAUTHORS_FORM_ID = 'coauthors-form';
  const COAUTHORS_TABLE_AREA_ID = 'coauthors-table-area';
  const COAUTHORSJSON_BTN_ID = 'coauthorsjson-btn';
  const COAUTHORSJSON_IFRAME_ID = 'coauthorsjson-iframe';

  TECHNOLOGIES.map(text => {
    addTodoItem(text, TODO_LIST_ID);
  });

  /*********************
   * INIT ALL SECTIONS *
   *********************/
  initTodo(TODO_FORM_ID, TODO_INPUT_ID, TODO_LIST_ID);
  initBCR(BCR_START_BTN_ID, BCR_CHECKBOX_AREA_ID, BCR_AREA_ID);
  initCoauthors(COAUTHORS_FORM_ID, COAUTHORS_SELECT_ELEMENT_ID, COAUTHORS_TABLE_AREA_ID);
  initSendToCoauthorjson(
    COAUTHORSJSON_BTN_ID,
    COAUTHORS_SELECT_ELEMENT_ID,
    COAUTHORSJSON_IFRAME_ID
  );
})();
