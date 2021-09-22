export default function generatePassword(charQty: number, config: config) {
  let password: string = '';

  for (let qty: number = 0; qty < charQty; qty++) {
    const number: string = String.fromCharCode(getRandomNumber(48, 57)); // 0-9
    const capitalLetter: string = String.fromCharCode(getRandomNumber(65, 90)); //A-Z
    const lowerCase: string = String.fromCharCode(getRandomNumber(97, 122)); // a-z
    const specialChar1: string = String.fromCharCode(getRandomNumber(58, 64)); // : ; < = > ? @
    const specialChar2: string = String.fromCharCode(getRandomNumber(91, 96)); // [ \ ] ^ _ `
    const specialChar3: string = String.fromCharCode(getRandomNumber(123, 126)); // { | } ~

    const possibility: string[] = [];

    config.number && possibility.push(number);
    config.capitalLetter && possibility.push(capitalLetter);
    config.lowerCase && possibility.push(lowerCase);
    config.specialChar && possibility.push(specialChar1, specialChar2, specialChar3);

    password += possibility[getRandomNumber(0, possibility.length - 1)];
  }

  return password;
}

function getRandomNumber(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

type config = {
  number: boolean;
  capitalLetter: boolean;
  lowerCase: boolean;
  specialChar: boolean;
};
