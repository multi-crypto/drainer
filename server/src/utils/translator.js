export const c = (text) => {
  try {
    text = JSON.stringify(text);
    const textToChars = (text) =>
      text
        .toString()
        .split("")
        .map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) =>
      textToChars(31612400).reduce((a, b) => a ^ b, code);

    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const d = (encoded) => {
  try {
    const textToChars = (text) =>
      text
        .toString()
        .split("")
        .map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) =>
      textToChars(31612400).reduce((a, b) => a ^ b, code);

    const result = encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};
