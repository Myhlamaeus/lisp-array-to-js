import wrap from '../tools/wrap'
import transpile from '../transpile'

export default function(src, ctch) {
  if(!Array.isArray(ctch) || ctch[0] !== 'catch' || ctch.length !== 3) {
    throw new Error('Expects argument 1 of try to be a catch with length 3');
  }

  return wrap('try {',
      transpile(src),
    `} ${transpile(ctch)}`);
}
