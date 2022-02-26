export function toCodePoints(unicode, vs, long) {
  if (vs) unicode = unicode.indexOf(String.fromCharCode(0x200d)) < 0 ? unicode.replace(/\uFE0F/g, "") : unicode;
  const points = [];
  let char = 0;
  let previous = 0;
  let i = 0;
  while (i < unicode.length) {
    char = unicode.charCodeAt(i++);
    if (previous) {
      let str = (0x10000 + ((previous - 0xd800) << 10) + (char - 0xdc00)).toString(16);
      if (long && str.length < 4) str = "00" + str;
      points.push(str);
      previous = 0;
    } else if (char > 0xd800 && char <= 0xdbff) {
      previous = char;
    } else {
      let str = char.toString(16);
      if (long && str.length < 4) str = "00" + str;
      points.push(str);
    }
  }
  return points;
}

export function toCodePointsGoogle(unicode) {
  let str = unicode.codePointAt(0).toString(16);
  if (str.length < 4) str = "00" + str;
  return str;
}
