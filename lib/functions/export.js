import Expression from '../tools/expression'
import transpile from '../transpile'

export default function(content) {
  let expr = 'module.exports';
  if(arguments.length > 1) {
    expr += `[${transpile(arguments[0])}]`;
    content = arguments[1];
  }
  return new Expression(expr + ' = ' + transpile(content));
}
