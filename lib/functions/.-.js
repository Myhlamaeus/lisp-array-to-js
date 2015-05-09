import quote from '../tools/quote'
import transpile from '../transpile'

export default function(obj, name, val) {
  let ret = `env[${quote(obj)}][${quote(transpile(name))}]`
  if(arguments.length > 2) {
    ret += ` = ${transpile(val)}`
  }
  return ret
}
