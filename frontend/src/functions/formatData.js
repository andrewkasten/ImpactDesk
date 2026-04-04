export function formatDate(str){

  const date = str.split('-')
  return `${date[1]}-${date[2]}-${date[0]}`

}

export function time12(str){

  str = new Date('1970-01-01T' + str + 'Z')
  .toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})
  return str
  
}