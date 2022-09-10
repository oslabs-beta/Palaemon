// function to parse string to turn to number
export function parseMem(entry:string) {
  // if dealing with memory (ki, mb, mi, etc.)
  
  return parseInt(entry.slice(0, entry.length-2))
}