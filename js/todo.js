/**
 * A function that appends a new item to all sections.
 * 
 * This function should:
 * 1. Adds an li item with text and delete button to the list
 * 2. Updates the bar chart race checkbox area
 * 3. Updates the coauthors select option area
 * 
 * * Note: The li element must have a single button that is used to delete the item from the list
 * * Hint: use the createElement() method to create the delete button and set the click event listener to use the removeTodoItem function
 *
 * @param {string} text - term to be added to the list 
 * @param {string} listId - id of todo list HTMLElement 
 */
 const addTodoItem = (text, listId) => {
	// TODO: Write your code here

	// 1.
	// TS
	// Add text and button to todo-list
	const elem = document.createElement('li');
	const span = document.createElement("SPAN");
	span.textContent = text;
	elem.appendChild(span);

	const button = document.createElement('button');
	button.innerHTML = 'delete';
	button.addEventListener('click', removeTodoItem);
	elem.appendChild(button);
	
	document.getElementById(listId).appendChild(elem);

	// 2.
	addCheckboxItem(text);
	// Add items to library search dropdown list
	addSearchOption(text);
	// TS

};

/**
 * A function that deletes items from all sections
 * 
 * This function should:
 * 1. remove the li element from the list
 * 2. Update the bar chart race checkbox area
 * 3. Update the coauthors select option area
 * 
 * * Hint: you can use the event.target.value to get the text.
 * * Hint: remember to filter out leading and trailing space or newline from the value
 * 
 * @param {object} event - event object of the triggered action 
 */
 const removeTodoItem = event => {

	// TODO: Write your code here

	// 1
	// TS
	const label = String(event.currentTarget.parentNode.textContent).replace("delete", "");
	event.currentTarget.parentNode.remove();

	// 2
	removeCheckboxItem(label);
	removeSearchOption(label);
	// TS
};

/**
 * A function that initiates the todo section
 * 
 * This function should:
 * 1. handle submitting new items
 * 
 * * Note: remember to filter out leading and trailing space or newline from the value
 * * Hint: listen for the submit event of the todo form
 * * Hint: use the event.preventDefault() function to prevent page reload.
 * * Hint: use the event.target.value to get the text value.
 * 
 * @param {string} todoFormId - id of todo form HTMLElement 
 * @param {string} todoInputId - id of todo input HTMLElement 
 * @param {string} todoListId - id of todo list HTMLElement 
 */
 const initTodo = (todoFormId = "todo-form", todoInputId = "todo-input", todoListId = "todo-list") => {
	// TODO: Write your code here
	
	// TS
	document.getElementById(todoFormId).addEventListener('submit', function(e) {
		e.preventDefault();
		const input = document.getElementById(todoInputId);
		if(input){
			let text = input.value;
			text = text.trim();
			if (text.length > 0) {
				addTodoItem(text, todoListId);
				document.getElementById(todoInputId).value = '';
			}
		}
	});
	// TS

};
