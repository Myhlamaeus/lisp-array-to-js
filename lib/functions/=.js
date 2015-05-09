import Expression from '../tools/expression'
import transpile from '../transpile'

export default function(a, b) {
  return new Expression(`${transpile(a)} === ${transpile(b)}`);
}
