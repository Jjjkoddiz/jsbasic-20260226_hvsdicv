function getMinMax(str) {
  const parts = str.split(" ");
  const numbers = [];

  for (let part of parts) {
    const num = parseFloat(part);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { min, max };
}
