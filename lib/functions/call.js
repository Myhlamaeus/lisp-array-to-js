import transpile from '../transpile'
import get from './.-'

export default function(obj, name, ...args) {
  return `${get(obj, name)}(${args.map(transpile).join(', ')})`;
}
