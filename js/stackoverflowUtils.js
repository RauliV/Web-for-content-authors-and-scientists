// TS >

/**
 * extract data from url
 * 
 * @param {string} url - url to get data from
 * @returns {Promise<object>} - json object of technologies
 */
 async function getDataFromUrl(url) {

  const data = await (await fetch(url)).json();
  return data;
}

// TS <

/**
 * fetch JSON data based on provided technologies
 *
 * @param {Array<string>} technologies - Array of the required technologies
 *
 * @returns {Promise<object>} - json object from the technologies
 * 
 * * Note: URL format is 'https://tie-lukioplus.rd.tuni.fi/cais/api/stackoverflow/stats?tech=<search term>;<search term>;<search term>'
 * * Where <search term> must be a URI encoded string
 * * Note: The data got from the endpoint is similar to the Manipulating stackOverflowStats object (Ex 6.5)
 * https://plus.tuni.fi/comp.cs.200/spring-2022/lectures_js2/js2_manipulatestackoverflow/
 */

const fetchSOFData = technologies => {
	// TODO: Write your code here

  // TS >
  let string = 'https://tie-lukioplus.rd.tuni.fi/cais/api/stackoverflow/stats';
  if (technologies.length !== 0) { string = string + "?tech=";}

  // Make query string of required technologies
  let query = technologies.reduce((prev, curr) => prev + ';' + curr);
  query = encodeURIComponent(query);

  return getDataFromUrl(string + query);
  // TS <

};

/**
 * A function that restructures the provided data to the format required by Bar Chart Race
 * 
 * @param {object} data - data to be formated
 * @param {Array<string>} technologies - array of technologies used for the formating
 * 
 * @returns {Array<object>} - list of fromatted tehc-year combinations
 * 
 */
const formatSOFData = (data, technologies) => {

  // Properties to be counted
  const techProperties = ['currentTech', 'currentLibs', 'currentDbs', 'currentPlatforms'];

  // HELPER CALLBACKS
  const resolveNan = (val) => { if(isNaN(val)){return 0;} else {return val;} };
  // Remove properties not to be counted
  const filterProperties = (yObj) => { 
    return Object.fromEntries(Object.entries(yObj).filter(([key, val]) => techProperties.includes(key))); 
  };

  // Requires filterProperties and resolveNan
  const resolveValue = (tech, yObj) => { return Object.values(filterProperties(yObj)).reduce((prev, curr) => prev + resolveNan(curr[tech]), 0); };
  const intiObject = (tech, y) => { return {name: tech, year: parseInt(y), value: 0, lastValue: 0}; };

  // Init datastrucutre and add year & value
  const yearTechList = Object.entries(data).map(([y, yObj]) => 
    technologies.map(tech => {
      const obj = intiObject(tech, y); // Intit with given tech name and year
      obj.value = resolveValue(tech, yObj); // Calculate mentions
      return obj;
  }));

  const flattened = yearTechList.flat();

  const resolveLastValue = (lastArr) => {try{return lastArr[0].value;} catch(e) {return 0;}};
    // Get last years value
  const lastValuesAdded = flattened.map(obj => {
    const resObj = obj;
    resObj.lastValue = resolveLastValue(flattened.filter(obj2 => {
      if((obj2.year === (resObj.year - 1)) && obj2.name === resObj.name) {return true;} else {return false;}
    }));
  return resObj;
  });

  // Sort by tech name
  function compare( a, b ){
    if ( technologies.indexOf(a.name) < technologies.indexOf(b.name) ){return -1;}
    if ( technologies.indexOf(a.name) > technologies.indexOf(b.name) ){
      return 1;
    }
    return 0;
  }
  lastValuesAdded.sort( compare );
  return lastValuesAdded;
  // TS <
};

/**
 * A function that appends a new checkbox of the given text to the checkbox area container
 * 
 * @param {string} text - value to be added to the select options 
 * @param {string} techsCheckboxAreaId - id of the checkbox area container
 * 
 * * NOTE: THE ID MUST BE AS PROVIDED *
 */
function addCheckboxItem(text, techsCheckboxAreaId = 'bcr-techs-checkbox') {
	// TODO: Write your code here

  // TS >
	// Add checkbox and label to bar chart area
	const d = document.createElement('div');
	d.id = 'cb_' + text;

	const cb = document.createElement('input');
  cb.type = 'checkbox';
	d.appendChild(cb);

	const l = document.createElement('label');
	l.innerHTML = text;
	d.appendChild(l);

	document.getElementById(techsCheckboxAreaId).appendChild(d);
  // TS <
}


/**
 * A function that removes a checkbox of the given text from the checkbox area container
 * 
 * @param {string} text - value to be removed to the select options 
 * @param {string} techsCheckboxAreaId - id of the checkbox area container
 * 
 * * NOTE: THE ID MUST BE AS PROVIDED *
 */
function removeCheckboxItem(text, techsCheckboxAreaId = 'bcr-techs-checkbox') {
	// TODO: Write your code here

  // TS >
  // Get checkbox by id and remove it
	document.getElementById('cb_' + text).remove();
	// TS <

}


/**
 * A function that gets the value of checked checkboxes in the checkbox area container
 * 
 * @param {string} techsCheckboxAreaId - id of the checkbox area container
 * 
 * @returns {Array<string>} The value of the selected checkboxes
 * 
 * * NOTE: THE ID MUST BE AS PROVIDED *
 */
function getCheckedItems(techsCheckboxAreaId = 'bcr-techs-checkbox') {
	// TODO: Write your code here

  // TS >
  // Map checked boxes to array
  const checkboxes = Array.from(document.getElementById(techsCheckboxAreaId).children);
  const res = checkboxes.filter(box => box.querySelector('input').checked === true).map(box => box.innerText);
  return res;
  // TS <
}

/**
 * A function that initiates the bar chart race
 * 
 * The function should:
 * 1. Set the event listner to stary the bar chart race
 * 2. Call the fetch data function to get the data from the endpoint
 * 3. call the format data function
 * 4. Use the formated data to start the bar chart race
 * 
 * * Note: To start the bar chart race, use the startBCR() function which is located in barChartRace.js
 * 
 * @param {string} BCRStartBtnId - id of the bar chart race start button
 * @param {string} BCRCheckboxAreaId - id of the bar chart race checkbox area
 * @param {string} BCRAreaId - id of bar chart race area
 */
const initBCR = (BCRStartBtnId, BCRCheckboxAreaId, BCRAreaId) => {
	const BCRStartBtn = document.getElementById(BCRStartBtnId);
  const BCRArea = document.getElementById(BCRAreaId);
  BCRStartBtn.addEventListener('click', function () {
    // Clear previous BCR if exists
    BCRArea.innerHTML = '';
    const techArr = getCheckedItems(BCRCheckboxAreaId);
    if (techArr.length === 0) return;
    // Fetch data from Stackoverflow (SOF) API endpoint
    fetchSOFData(techArr).then((data) => {
      // Get formated data for the Bar Chart Race
      const result = formatSOFData(data, techArr);

      // Initialize the BCR
      startBCR({
        tickDuration: 1000,
        compareCount: techArr.length,
        svgTitle: 'StackOverflow technology mentions',
        svgSubtitle: 'Bar Chart Race',
        source: 'Stackoverflow',
        startYear: 2011,
        stopYear: 2020,
        interval: 1,
        data: result,
        svgSelector: `#${BCRArea.id}`,
      });
    });
  });
};
