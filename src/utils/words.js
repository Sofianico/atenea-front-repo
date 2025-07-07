export const countWords = (w) => {
  return w.split(" ").filter(w => w.length > 0).length
}