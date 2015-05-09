import quote from '../tools/quote'
import transpile from '../transpile'
import Expression from '../tools/expression'

export default function(name, val) {
  return new Expression(`env[${quote(name)}] = ${transpile(val)}`);
}
