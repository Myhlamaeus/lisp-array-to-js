import indent from '../tools/indent'
import transpile from '../transpile'

export default function(cond, truthy, falsy) {
  return `((${transpile(cond)})\n` +
      `${indent(`? ${transpile(truthy)}`)}\n` +
      `${indent(`: ${transpile(falsy)}`)})`;
};
