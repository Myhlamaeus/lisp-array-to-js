import iife from '../tools/iife'
import transpile from '../transpile'

export default function(scope, content) {
  return iife([transpile(content)], ['env'], [transpile(scope)])
}
