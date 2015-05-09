import wrap from './wrap'
import stmts from './stmts'

export default function(content, args) {
  const execs = content.slice()
  const val = execs.pop()

  return wrap(`(function(${(args || []).join(', ')}) {`, stmts(execs.concat([`return ${val}`])), '})');
};
