import stmts from './lib/tools/stmts'
import iife from './lib/tools/iife'
import transpile from './lib/transpile'

function transpileProgram (val) {
  return stmts([iife([transpile(val)], ['env'], ['Object.create(null)'])])
}

export default transpileProgram

export {default as transpile} from './lib/transpile'

export function exec (arr) {
  /*eslint-disable no-eval */
  return eval(this(arr))
  /*eslint-enable no-eval */
}
