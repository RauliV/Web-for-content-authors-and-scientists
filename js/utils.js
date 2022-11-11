/**
 * Removes leading and trailing spaces or newline from a string
 *
 * @param {string} str - string to filter
 * @returns {string} - filtered string
 */
const filterSpace = str => str.trim();

/**
 * fetch JSON data from url
 *
 * @param {string} url - url to json api
 * @returns {Promise<object>} - json object from the url
 */
const fetchFromURL = url => {
  return fetch(url).then(response => response.json());
};
