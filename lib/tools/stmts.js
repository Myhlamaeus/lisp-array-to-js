export default function(arr) {
  return arr.join(';\n') + (arr.length ? ';' : '');
};
