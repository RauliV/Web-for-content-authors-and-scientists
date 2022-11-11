// helper function for creating randomized test data
const generateRandomString = (length = 9) => {
  let str = '';

  do {
    str += Math.random()
      .toString(36)
      .substring(2, length + 2)
      .trim();
  } while (str.length < length);

  return str.substring(0, length);
};

// generate array of randomized strings
const generateRandomArray = (arrayLength, stringLength = 9) => {
  return Array.from({ length: arrayLength }, () => generateRandomString(stringLength));
};

// convert HTML entities to the actual characters
const convertEntities = str => {
  const span = document.createElement('span');
  span.innerHTML = str;
  return span.textContent;
};

// get random integer between 0 and upperBound
const getRandomNumber = upperBound => Math.floor(Math.random() * upperBound);
