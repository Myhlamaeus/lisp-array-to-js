import quote from '../tools/quote'

export default function(val) {
  if(typeof val === 'string') {
    return quote(val)
  }
  return JSON.stringify(val)
}
