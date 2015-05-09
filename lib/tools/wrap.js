import indent from './indent'

export default function(str1, str2, str3) {
  return `${str1}\n${indent(str2)}\n${str3}`
}
