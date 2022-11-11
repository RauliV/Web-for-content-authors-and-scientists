/**
 * The function fetches data from our library API:
 * the URL is hard-coded.
 *
 * Your duty is to handle the data, in then branch
 * 1. first, parse json. Parsing json is async operation.
 * 2. get the data from the previous then branch,
 * and convert it to be of a right format.
 * This file contains the right function.
 *
 * Next, you have to check force.js:
 * construct a sociogram by initializing it.
 * Then update it with the found publications and
 * a brand new sociogram. Done.
 *
 * @param {*} q the search term that is passed to library API
 * @returns {Promise} search result visualized as a sociogram, where root is
 * the search term
 */
async function constructSociogram (q) {
  const url = `https://tie-lukioplus.rd.tuni.fi/cais/api/publ?q=${q}`;
  return (
    fetch(url)
      // TODO: Write your code here (from check Ex7.3 Co-authors as JSON)
      // https://plus.tuni.fi/comp.cs.200/spring-2022/lectures_js3/js3_coauthorsjson/#chapter-exercise-1
      .then(data => data.json())
      .then((data) => {const force = init(1000, 1000); update(publJSON(data), force);})
      .catch(err => console.log(err))
  );
}

/**
 * clean function gets a text and replaces
 * special entities as their UTF-8 counterparts.
 *
 * @param {string} text text
 * @returns {string} more readable "clean" text
 */
function clean (text) {
  const rules = [
    /{'{a}}/g,
    /{'{e}}/g,
    /{'{o}}/g,
    /{"{e}}/g,
    /{"{a}}/g,
    /{"{o}}/g,
    /{-}/g,
    /{/g,
    /}/g,
    /&apos;/g,
    /&amp;/g
  ];
  const chars = ['á', 'é', 'ó', 'ë', 'ä', 'ö', '-', '', '', "'", '&'];
  rules.forEach((rule, ind) => (text = text.replace(rule, chars[ind])));
  return text.endsWith('.') ? text.slice(0, -1) : text;
}

/**
 * For some unknown reasons it seemed that force graph remembered old nodes.
 * The removal seemed to help for this.
 * Consider this function as not that desirable work-around.
 */
function rmSVG () {
  const body = document.querySelector('body');
  const svgElems = body.querySelectorAll('svg');
  svgElems.forEach(e => body.removeChild(e));
}

/**
 * Function constructs a data object that is understood by
 * the force graph
 *
 * @param {*} name name
 * @param {*} pid pid
 * @param {*} titles titles
 * @param {*} tmpChildren children
 * @returns data object understood by force graph
 */
function dataObj (name, pid = null, titles = [], tmpChildren = []) {
  const children = tmpChildren
    ? tmpChildren.filter(child => child !== null)
    : [];
  const res =
    !children || !Array.isArray(children) || children.length < 1
      ? {
          name: name,
          pid: pid,
          titles: titles,
          size: `${1000 * titles.length + 500}`
        }
      : {
          name: name,
          pid: pid,
          titles: titles,
          size: `${1000 * children.length + 1000 * titles.length + 500}`,
          children: children
        };
  return res;
}

/**
 * Gets children as string array, constructs object array as a return
 *
 * @param {*} children array
 * @returns {Array<object>} Object array
 */
function getAsObjArr (children) {
  return !children || !Array.isArray(children)
    ? []
    : children.map(child => ({ name: child, size: 500 }));
}

/**
 * A helper function for removeDuplicates,
 * returns item and in which indices the item if found in the array a
 *
 * @param {Array} a initial array
 * @returns {object} where items are unique array items and values the index array
 * where each item is found, if found once, the array size is one
 */
function getDuplicates (a) {
  return a.reduce(function (obj, b, ind) {
    (obj[b] = obj[b] || []).push(ind);
    return obj;
  }, {});
}

/**
 * If an author has many articles, the function merges
 * them under one author, having many titles and potential children
 * (=co-authors)
 *
 * @param {*} publications publications
 * @returns {object} merged publications
 */
function removeDuplicates (publications) {
  const tmpNames = publications.map(p => p.name);
  const duplicates = getDuplicates(tmpNames);
  const names = [...new Set(tmpNames)];
  // no duplicates - return publications
  const res =
    names.length === tmpNames.length
      ? publications
      : names.map(name => {
        const duplArr = duplicates[name];
        const tmpTitles = duplArr.map(ind => publications[ind].titles).flat();
        const pid = duplArr
          .map(ind => publications[ind].pid)
          .filter(p => p)[0];
        const finalTitles = [...new Set(tmpTitles)];
        const tmpChildren = duplArr
          .map(ind => publications[ind].children)
          .flat()
          .filter(a => a);
        const tmpNames = tmpChildren.map(o => o.name);
        const finalChildren = getAsObjArr([...new Set(tmpNames)]);
        return dataObj(name, pid, finalTitles, finalChildren);
      });
  return res;
}

/**
 * A function to be called in fetch once data is solved
 *
 * @param {*} data is the raw JSON data that is got from the library API endpoint
 * @returns {object} publications in a JSON format ("graph") that is understood by the force graph
 * in order to construct the sociogram.
 */
function publJSON (data, term) {
  let publications = data.map(d => {
    if (!Object.keys(d).includes('authors')) return;
    const authors = Array.isArray(d.authors.author) ? d.authors.author : [];
    const author = authors.length ? authors[0] : undefined;
    if (!author) return undefined;
    const title = clean(d.title);
    const children = authors.splice(1).map(a => clean(a.text));
    return dataObj(
      clean(author.text),
      author['@pid'],
      [title],
      getAsObjArr(children)
    );
  });
  // to remove undefined
  publications = publications.filter(p => p);
  // const root = document.querySelector("#q").value;
  return dataObj(term, null, [], removeDuplicates(publications));
}

/**
 * A function that provides the clears the old SVG and initiates a new fetch request
 *
 * @param {string} term - word or phrase to be search for
 * @returns {Promise} construct sociogram
 */
const search = async term => {
  console.log("re_" + term);
  rmSVG();
  const q = encodeURI(term);
  await constructSociogram(q);
};

/**
 * A function that listens for message posted from it's parent window and
 * initiates the search function with the data received.
 *
 * Note: Expects parent frame to post the term to be drawn in it's message data.
 * HINT: Set a post message listener and use the data received to initiate the search function
 *
 * @param {object} window - The window object reference of the iframe.
 */
 const initCoauthorsjson = window => {
  // TODO: Write your code here
  window.addEventListener('message', term => {search(term.data);});
};
