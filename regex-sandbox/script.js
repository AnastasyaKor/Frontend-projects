const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

function getFlags() {
  let flags = "";

  if (caseInsensitiveFlag.checked) flags += "i";
  if (globalFlag.checked) flags += "g";

  return flags;
}

function highlightMatches(text, regex) {
  return text.replace(regex, (match) => {
    return `<span class="highlight">${match}</span>`;
  });
}

testButton.addEventListener("click", () => {
  const patternValue = regexPattern.value.trim();
  const flags = getFlags();
  const text = stringToTest.textContent;

  stringToTest.textContent = text;

  if (!patternValue) {
    testResult.textContent = "Enter a regex pattern first.";
    return;
  }

  try {
    const regex = new RegExp(patternValue, flags);
    const matches = text.match(regex);

    if (!matches) {
      testResult.textContent = "No match found.";
      return;
    }

    testResult.textContent = matches.join(", ");
    stringToTest.innerHTML = highlightMatches(text, regex);
  } catch (error) {
    testResult.textContent = "Invalid regex pattern.";
  }
});

stringToTest.addEventListener("input", () => {
  const plainText = stringToTest.textContent;
  stringToTest.textContent = plainText;
});
