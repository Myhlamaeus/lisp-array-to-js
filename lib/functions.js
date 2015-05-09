import prefixToInfix from './tools/prefix-to-infix'
import js from './functions/js'
import def from './functions/def'
import _let from './functions/let'
import escape from './functions/`'
import _try from './functions/try'
import _catch from './functions/catch'
import get from './functions/.-'
import call from './functions/call';
import _do from './functions/do'
import _if from './functions/if'
import fn from './functions/fn'
import equals from './functions/='
import _with from './functions/with'
import _import from './functions/import'
import _export from './functions/export'

const functions = {
  js, def, fn,
  '`': escape,
  '.-': get,
  '.': call,
  '=': equals,
  let: _let,
  try: _try,
  catch: _catch,
  do: _do,
  if: _if,
  with: _with,
  import: _import,
  export: _export
}

for (let symbol of ['<', '+', '-', '*', '/', '%']) {
  functions[symbol] = prefixToInfix(symbol)
}

export default functions
