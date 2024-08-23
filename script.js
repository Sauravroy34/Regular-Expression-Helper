document.getElementById('run').addEventListener('click', () => {
    const regexInput = document.getElementById('regexp').value;
    const flags = document.getElementById('flags').value;
    const stringInput = document.getElementById('string').value;
    const func = document.getElementById('function').value;
    const outputDiv = document.getElementById('output');
  
    outputDiv.innerHTML = '';
  
    if (!regexInput) {
      outputDiv.innerHTML = 'Please enter a regular expression';
      return;
    }
  
    if (!stringInput) {
      outputDiv.innerHTML = 'Please enter a string to test';
      return;
    }
  
    try {
      const regex = new RegExp(regexInput, flags);
      let result;
  
      if (func === 'test') {
        result = regex.test(stringInput);
        outputDiv.innerHTML = `Test result: ${result}`;
      } else if (func === 'search') {
        const index = stringInput.search(regex);
        if (index !== -1) {
          result = `Pattern found at index: ${index}`;
        } else {
          result = 'No match found';
        }
        outputDiv.innerHTML = `${result}`;
      } else if (func === 'match') {
        const matches = stringInput.match(regex);
        if (matches) {
          result = matches.join(', ');
          const highlighted = stringInput.replace(regex, match => `${match}`);
          outputDiv.innerHTML = `${result} is in ${highlighted}`;
        } else {
          outputDiv.innerHTML = 'No matches found';
        }
      }
    } catch (e) {
      outputDiv.innerHTML = `Error in regular expression: ${e.message}`;
    }
  });
  