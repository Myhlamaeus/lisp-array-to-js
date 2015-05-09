import Expression from '../tools/expression'
import func from '../tools/func'
import _let from './let'

export default function(args, body) {
  return func(['var __args = arguments',
    _let(args.reduce(function(arr, name, i) {
      if(name !== '&') {
        arr.push(name, new Expression('__args[' + i + ']'));
      }
      return arr;
    }, []), body)]);
}
