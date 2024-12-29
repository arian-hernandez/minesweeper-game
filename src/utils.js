export function getRandomInt(max){
  const min = 0; //it always start with the first position as an option
  max = Math.floor(max); // Round down to nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min; // Generate random integer
}

