class Quoted {
  constructor(str) {
    this.str = str
  }

  toString() {
    return JSON.stringify(String(this.str))
  }
}

export default function(str) {
  if(typeof str === 'object' && str instanceof Quoted) {
    return str
  }
  return new Quoted(str)
}
