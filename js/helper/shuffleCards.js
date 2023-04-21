export const snuffleCards = array => {
    let newArray = [...array];
    let m = newArray.length, t, i;

    // Пока есть элементы для перемешивания
    while (m) {
  
      // Взять оставшийся элемент
      i = Math.floor(Math.random() * m--);
  
      // И поменять его местами с текущим элементом
      t = newArray[m];
      newArray[m] = newArray[i];
      newArray[i] = t;
    }
  
    return newArray;
}