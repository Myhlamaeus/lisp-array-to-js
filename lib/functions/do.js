import iife from '../tools/iife'
import transpile from '../transpile'

export default function(...expressions) {
  return iife(expressions.map(transpile))
}
