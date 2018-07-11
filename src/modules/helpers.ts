export function getCorrectTextColor(hex: string) {
  /*
  From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast

  Color brightness is determined by the following formula:
  ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

  I know this could be more compact, but I think this is easier to read/explain.

  */

  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  function hexToR(h: string) {
    return parseInt(cutHex(h).substring(0, 2), 16);
  }
  function hexToG(h: string) {
    return parseInt(cutHex(h).substring(2, 4), 16);
  }
  function hexToB(h: string) {
    return parseInt(cutHex(h).substring(4, 6), 16);
  }
  function cutHex(h: string) {
    return h.charAt(0) === '#' ? h.substring(1, 7) : h;
  }

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  if (cBrightness > threshold) {
    return '#000000';
  } else {
    return '#ffffff';
  }
}

export function getISO(date: Date) {
  return (
    date.getUTCFullYear() +
    '-' +
    pad(date.getUTCMonth() + 1) +
    '-' +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    ':' +
    pad(date.getUTCMinutes()) +
    ':' +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}
function pad(num: number) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}

export function getRepoKey(repo: string, username: string, date: string) {
  return `${repo}/${username}:${date}`;
}
