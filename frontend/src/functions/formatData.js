export function formatDate(str){

  const date = str.split('-')
  return `${date[1]}-${date[2]}-${date[0]}`

}

// Developments can be saved before they have times, so guard the empty case —
// without it `new Date('1970-01-01TnullZ')` renders "Invalid Date".
export function time12(str){

  if (!str) return "—"
  const date = new Date('1970-01-01T' + str + 'Z')
  if (Number.isNaN(date.getTime())) return "—"
  return date
  .toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})

}