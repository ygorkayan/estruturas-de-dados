////////////////////////////////////////////////////////////////

function dubbleSort(array: number[]) {
  const newArray = [...array];
  const { length } = newArray;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (newArray[j] > newArray[j + 1]) {
        const temp = newArray[j];
        newArray[j] = newArray[j + 1];
        newArray[j + 1] = temp;
      }
    }
  }
  return newArray;
}

////////////////////////////////////////////////////////////////

function selectionSort(array: number[]) {
  const newArray = [...array];
  const { length } = newArray;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i; j < length; j++) {
      if (newArray[indexMin] > newArray[j]) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      const temp = newArray[i];
      newArray[i] = newArray[indexMin];
      newArray[indexMin] = temp;
    }
  }
  return newArray;
}

////////////////////////////////////////////////////////////////

function insertionSort(array: number[]) {
  const newArray = [...array];
  const { length } = newArray;
  let temp;

  for (let i = 1; i < length; i++) {
    let j = i;
    temp = newArray[i];
    while (j > 0 && newArray[j - 1] > temp) {
      newArray[j] = newArray[j - 1];
      j--;
    }
    newArray[j] = temp;
  }
  return newArray;
}

////////////////////////////////////////////////////////////////

function mergeSort(array: number[], compare: (a: any, b: any) => number) {
  let newArray = [...array];

  if (newArray.length > 1) {
    const { length } = newArray;
    const middle = Math.floor(length / 2);
    const left = mergeSort(newArray.slice(0, middle), compare);
    const right = mergeSort(newArray.slice(middle, length), compare);
    newArray = merge(left, right, compare);
  }
  return newArray;
}

function merge(left: number[], right: number[], compare: (a: any, b: any) => number) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(compare(left[i], right[j]) < 0 ? left[i++] : right[j++]);
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

////////////////////////////////////////////////////////////////

function quickSort(array: number[], compare: (a: any, b: any) => number) {
  const newArray = [...array];
  return quick(newArray, 0, array.length - 1, compare);
}

function quick(array: number[], left: number, right: number, compare: (a: any, b: any) => number) {
  let index: number = 0;
  if (array.length > 1) {
    index = partition(array, left, right, compare);
  }
  if (left < index - 1) {
    quick(array, left, index - 1, compare);
  }
  if (left < right) {
    quick(array, index, right, compare);
  }
  return array;
}

function partition(array: number[], left: number, right: number, compare: (a: any, b: any) => number) {
  const pivot = array[Math.floor((right + left) / 2)];

  let i = left;
  let j = right;

  while (i <= j) {
    while (compare(array[i], pivot) < 0) {
      i++;
    }

    while (compare(array[j], pivot) > 0) {
      j--;
    }

    if (i <= j) {
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      i++;
      j--;
    }
  }

  return i;
}

////////////////////////////////////////////////////////////////

function createArray(qtd: number, min: number, max: number) {
  const array = [];
  for (let i = 0; i < qtd; i++) {
    array.push(Math.round(Math.random() * (max - min) + min));
  }
  return array;
}

const compare = (a: any, b: any): number => a - b;

const numero = 1000;
const arrayTest = createArray(numero, 0, numero * 10);

// Testes de velocidades dos algoritimos de ordenação

console.time('dubbleSort');
dubbleSort(arrayTest);
console.timeEnd('dubbleSort');

console.time('selectionSort');
selectionSort(arrayTest);
console.timeEnd('selectionSort');

console.time('insertionSort');
insertionSort(arrayTest);
console.timeEnd('insertionSort');

console.time('mergeSort');
mergeSort(arrayTest, compare);
console.timeEnd('mergeSort');

console.time('quickSort');
quickSort(arrayTest, compare);
console.timeEnd('quickSort');

console.time('native');
const newArray = [...arrayTest];
newArray.sort(compare);
console.timeEnd('native');
