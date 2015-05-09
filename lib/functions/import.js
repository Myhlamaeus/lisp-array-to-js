import Expression from '../tools/expression'
import transpile from '../transpile'

export default function(name) {
  return new Expression(`require(${transpile(name)})`);
}
