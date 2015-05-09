import _with from './with'
import def from './def'
import Expression from '../tools/expression'

export default function(vars, content) {
  const defs = []
  vars.forEach(function(val, i) {
    if(i % 2) {
      defs.push(def(vars[i - 1], vars[i]));
    }
  });
  return _with(new Expression('Object.create(env)'), defs.concat([content]));
};
