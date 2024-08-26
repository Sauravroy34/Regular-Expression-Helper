function processRegExp() {
  const regexInput = document.getElementById('regexp').value;
  const flags = document.getElementById('flags').value;
  const stringInput = document.getElementById('string').value;
  const func = document.getElementById('function').value;
  const outputDiv = document.getElementById('output');

  outputDiv.innerHTML = '';

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
          outputDiv.innerHTML = result;
      } else if (func === 'match') {
          const matches = stringInput.match(regex);
          if (matches) {
              outputDiv.innerHTML = `${matches} is in [${stringInput}]`;
          } else {
              outputDiv.innerHTML = 'No matches found';
          }
      }
  } catch (e) {
      outputDiv.innerHTML = `Error in regular expression: ${e.message}`;
  }
}

describe('processRegExp with DOM', () => {
  beforeEach(() => {
      document.body.innerHTML = `
          <input id="regexp" />
          <input id="flags" />
          <input id="string" />
          <select id="function">
              <option value="test">test</option>
              <option value="search">search</option>
              <option value="match">match</option>
          </select>
          <div id="output"></div>
          <button id="run"></button>
      `;
  });

  test.each([
      { regexInput: 'Test', flags: 'i', stringInput: 'This is a Test string', func: 'test', expected: 'Test result: true' },
      { regexInput: 'This', flags: 'g', stringInput: 'This is a Test string', func: 'search', expected: 'Pattern found at index: 0' },
      { regexInput: 'is', flags: 'g', stringInput: 'This is a Test string', func: 'match', expected: 'is,is is in [This is a Test string]' },
  ])(
      'processes $func function with regex="$regexInput" and flags="$flags"',
      ({ regexInput, flags, stringInput, func, expected }) => {
          document.getElementById('regexp').value = regexInput;
          document.getElementById('flags').value = flags;
          document.getElementById('string').value = stringInput;
          document.getElementById('function').value = func;


          processRegExp();

          expect(document.getElementById('output').innerHTML).toBe(expected);
      }
  );
});
