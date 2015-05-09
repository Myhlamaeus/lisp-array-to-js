import func from './func'

export default function(content, args, outerArgs) {
  return `${func(content, args)}(${(outerArgs || []).join(', ')})`
}
