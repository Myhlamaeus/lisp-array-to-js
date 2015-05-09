import wrap from '../tools/wrap'
import _let from './let'

export default function(varName, content) {
  return wrap('catch(__e) {',
      _let([varName, '__e'], content),
    '}');
};
