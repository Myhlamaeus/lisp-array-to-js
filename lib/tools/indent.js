import Expression from './expression'

const indentation = ' '.repeat(4)

export default function indent(str) {
  if(typeof str === 'object' && str instanceof Expression) {
    return new Expression(indent(str.val))
  }
  return indentation + str.replace(/\n/g, `\n${indentation}`)
}
