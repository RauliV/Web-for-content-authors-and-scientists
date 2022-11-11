

function parseObject(item){

  const title = item.title;
  const year = item.year;
  let authors = [];
  const aList = [];
  //jos authoreita ylipäätään
  if (Object.prototype.hasOwnProperty.call(item, "authors")){

    //jos useampia
    if (item.authors.author.length > 1){
      authors = item.authors.author;
    }
    else {
      authors.push(item.authors.author);
    }
      const rArray = [year, title, authors];

      return(rArray);

  }
  return null;

}

function createItem (item){

  const newItemObject = {};
  newItemObject.year = item[0];
  newItemObject.title = item[1];
  newItemObject.authors = item[2];
  return newItemObject;
}



/**
 * Get publications classified by year
 *
 * @param {*} publicationsData Original publications JSON data
 * @returns {object} Publications by year, each publication containing title, year, and authors
 */
 const getPublications = publicationsData => {

  const returnObject = {};
  const parsedObjects = [];
  const itemKeys = Object.keys(publicationsData);

  //parsi tarvittava data raakadatasta
  for (let i = 0; i < itemKeys.length; i++){
    const parsed = parseObject(publicationsData[itemKeys[i]]);
    if (parsed !== null){
      parsedObjects.push(parsed);   
    }
  }

  //luo kaikki teosobjectit (sekaisin arrayssa)
  const createdItems = [];
  for (const item of parsedObjects){
    createdItems.push(createItem(item));
  }

  //jaa teosobjecti -array osiin vuoden mukaan
  const objectsByYear = [];
  let objects = [];
  for (const cItem of createdItems){
    if (Object.prototype.hasOwnProperty.call(returnObject, cItem.year)){
      objects = returnObject[cItem.year];
      objects.push(cItem);

      returnObject[cItem.year] = objects;
    }
    else {
      objects = [];
      objects.push(cItem);
      returnObject[cItem.year] = objects;
    }
  }
  return returnObject;
  
};





/**
 * Get sorted list of unique years from publications
 *
 * @param {object} publications publications classified by year
 * @returns {Array<number>} unique years sorted in ascending order
 */
 const getYears = publications => {

  const years = Object.keys(publications);
  return years.sort();
};





/**
 * Construct publication row data suitable for constructTableRowsHtml()
 *
 * @param {object} publications publications classified by year
 * @param {Array<number>} years years which should be included in the data
 * @returns {Array} rowData
 */
 const constructPublicationRowData = (publications, years) => {
  // TODO: Implement this function
  if (publications === null){
    return [];
  }

  if (publications === [] || years === []){
    return [];
  }

  const returnArray = [];
  for (let i = 0; i < years.length; i++){

    if (publications[years[i]] != null){
   
    const publs = publications[years[i]];
 
    const pubkeys = Object.keys(publs);
 
    for (let i2 = 0; i2 < pubkeys.length; i2++){

      const publication = [];
      publication.push(publs[i2].year);
      publication.push(publs[i2].title);

      let auth = "";
      if (publs[i2].authors.length === 0){
        publication.push("");
        publication.push("");
      }
      else if (publs[i2].authors.length === 1){
        const ttt = publs[i2].authors[0];
        auth = publs[i2].authors[0].text;// + ",";
        publication.push(auth);
        publication.push("");
      }

      else{
        const gg = i2;
        const tst = publs[i2].authors.length;
        auth = publs[i2].authors[0].text;// + ",";
        publication.push(auth);
        auth = "";
        for (let i3 = 1; i3 < publs[i2].authors.length-1; i3++){
          auth = auth + publs[i2].authors[i3].text + ", ";
        }
        auth = auth + publs[i2].authors[publs[i2].authors.length-1].text;
        publication.push(auth);
      }

      returnArray.push(publication);
 
    }  
  }  
  }

  return returnArray;
};



/**
 * Get HTML of table rows
 *
 * @param {Array<string|number>} rowData table rows
 * @returns {string} HTML of the table rows
 */
 function constructTableRowsHtml (rowData) {
  let row = "";
  for (let it = 0; it < rowData.length; it ++){
    row = row + "<tr>";

    for (let it2 = 0; it2 < rowData[it].length; it2++){
      row = row + "<td>";
      row = row + rowData[it][it2];
      row = row + "</td>";
    }
    row = row + "</tr>";
  }
  return row;
}




/**
 * Get HTML of table heading row
 *
 * @param {Array<string|number>} headings Table headings
 * @returns {string} HTML of the heading row
 */
 function constructTableHeadHtml (headings) {
  let hRow = "<tr>";
  for (const heading of headings){
    hRow = hRow + "<th>";
    hRow = hRow + heading;
    hRow = hRow + "</th>";
  }
  hRow = hRow + "</tr>";
  return hRow;
}




/**
 * Construct HTML for publications table based on selected year or all
 * publications if year is not given
 *
 * @param {object} publications publications classified by year
 * @param {number|null} year The selected year
 * @returns {string} table HTML
 */
 const constructPublicationsTableHtml = (publications, year = null) => {

  //let element = document.getElementById("select-year");
  const years = getYears(publications);
/*
  let years = [];

  if ((year == null) || (year == "all")){

    for (let i = 0; i < options.length-1; i++){
        years.push(options[i].innerText);
    }
  }
  else{
    years.push(year);
  }    
*/

  const rowData = constructPublicationRowData(publications, years);
  const head = ["Year", "Title", "The 1st author", "Co-authors"];
  const htmlHead = "<thead>" + constructTableHeadHtml(head) + "</thead>";
  const htmlBody = "<tbody>" + constructTableRowsHtml(rowData) + "</tbody>";
  const caption = "<caption>Publications</caption>";
  const htmlTable = "<table>" + htmlHead + htmlBody + caption + "</table>";
  return htmlTable;

};






/**
 * A function that fetches data from library API endpoint
 *
 * Note: URL format is 'https://tie-lukioplus.rd.tuni.fi/cais/api/publ?q=<search term>'
 * Where <search term> must be a URI encoded string
 *
 * @param {string} term - search term
 * @returns {Promise<Array>} - similar to publicationsData in week 5 exercise 6
 */
const fetchLibrarySearchData = term => {


//async function getStackOverflowData (apiUrl, technologies = null){
  

const queryString = 'https://tie-lukioplus.rd.tuni.fi/cais/api/publ?q=' +
                     encodeURIComponent(term);
   const url = new URL(queryString);
  
  return fetch(url)
  .then((response) => response.json());
  
      
   
  
    

};




/**
 * A function that appends a new option of the given term to the select element children
 *
 * @param {string} term - term to be added to the select options
 * @param {string} coauthorsSelectElementId - id of the coauthors select element
 *
 * NOTE: THE ID MUST BE AS PROVIDED
 */
const addSearchOption = (term, coauthorsSelectElementId = 'coauthors-select-term') => {
   const dropdown = document.getElementById(coauthorsSelectElementId);
   const option = document.createElement("option");
   option.text = term;
   const id = 'op' + term;
   option.setAttribute('id', id);
   if ((term != null) && (term !== "")){
      dropdown.add(option);
   }
};

/**
 * A function that removes an option of the given term from the select element children
 *
 * @param {string} term - term to be removed from the select options
 * @param {string} coauthorsSelectElementId - id of the coauthors select element
 *
 * NOTE: THE ID MUST BE AS PROVIDED
 */
const removeSearchOption = (term, coauthorsSelectElementId = 'coauthors-select-term') => {
  const removeId = 'option#op' + term;
  const removeElement = document.getElementById(coauthorsSelectElementId);

  if ((term !== null) && (term !== "")){
    //if (document.getElementById(coauthorsSelectElementId).hasAttribute(removeId)){
      for (let i=0; i<removeElement.length; i++) {
        if (removeElement.options[i].value === term)
            removeElement.remove(i);
    }
       
      console.log(removeElement);
  }
 
};

/**
 * A function that returns the value of the selected option of the select element
 *
 * @param {string} coauthorsSelectElementId - id of the coauthors select element
 * @returns {string} The value of the selected option
 *
 * NOTE: THE ID MUST BE AS PROVIDED
 */
const getSearchOption = (coauthorsSelectElementId = 'coauthors-select-term') => {

  const selectedOption = document.getElementById(coauthorsSelectElementId);
  const selectedTerm = selectedOption.value;
  return (selectedTerm);
};

/**
 * A function that sets the submit listener of the form to update the result area with the table of the coauthors data
 * This function should use other functions to:
 * 1. Get the selected term
 * 2. Fetch the data for the selected term
 * 3. Construct the table (format data, buildrowdata....)
 * 4. Update the DOM with the table.
 *
 * @param {string} coauthorsFormId - id of the form containing a submit button that triggers the submit event
 * @param {string} coauthorsSelectElementId - id  select field in the form that contains the terms to be search for
 * @param {string} coauthorsResultAreaId - id  container element where the table should be drawn
 */
const initCoauthors = (coauthorsFormId, coauthorsSelectElementId, coauthorsTableAreaId) => {
  const coauthorsForm = document.getElementById(coauthorsFormId);
  const coauthorsTableArea = document.getElementById(coauthorsTableAreaId);

  coauthorsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = getSearchOption(coauthorsSelectElementId);
    if (searchTerm === '') return;
    fetchLibrarySearchData(searchTerm).then(publicationsData => {
      const publications = getPublications(publicationsData);
      coauthorsTableArea.innerHTML = constructPublicationsTableHtml(publications);
    });
  });
};

function coauthorsButtonClicked(event){
  postMessage(term, coauthorsjsonIframeId);
  console.log(term);
}
/**
 * A function that posts message (key term) to the coauthorsjson iframe.
 * When the button is clicked, the function should send the selected value (as string) to the iframe that
 * would be used by the coauthorsjson document
 *
 *
 * @param {string} coauthorsjsonBtnId - id  button that should trigger the coauthorsjson iframe
 * @param {string} coauthorsSelectElementId - id  Select element containing the key term to be used by the coauthorsjson
 * @param {string} coauthorsjsonIframeId - id iframe containing the coauthorsjson document
 */
const initSendToCoauthorjson = (
  coauthorsjsonBtnId,
  coauthorsSelectElementId,
  coauthorsjsonIframeId
) => {
  const buttonElement = document.getElementById(coauthorsjsonBtnId);
  buttonElement.addEventListener("click", function(){
    const term = getSearchOption(coauthorsSelectElementId);
    //postMessage(term, document.getElementById(coauthorsjsonIframeId));
    document.getElementById(coauthorsjsonIframeId).contentWindow.postMessage(term, '*');
    console.log(term);}, false);
};
