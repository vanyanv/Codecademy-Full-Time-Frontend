/**
 * This function adds an item at a random position in a given array.
 */
function addItemAtRandomPosition(array, item) {
  // Create a copy of the original array to avoid mutating it
  const newArray = [...array];

  // Generate a random index where the item will be added
  const index = Math.floor(Math.random() * (newArray.length + 1));

  // Add the item at the generated index
  newArray.splice(index, 0, item);

  // Return the new array with the item added
  return newArray;
}

export default addItemAtRandomPosition;
