import Expression from './expression'
import transpile from '../transpile'

export default function(operand, maxArgs = 2) {
  return function() {
    return new Expression([].slice.call(arguments, 0, maxArgs).map(transpile).join(` ${operand} `))
  }
}
