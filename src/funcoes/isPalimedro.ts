import Deque from '../estruturas-de-dados/deque';

export default function isPalimedro(palavra: string): boolean {
  const deque = new Deque<string>();
  const letrasDaPalavra = palavra.split('');

  if (letrasDaPalavra.length % 2 === 0) {
    return false;
  }

  letrasDaPalavra.forEach(letra => deque.addBack(letra));

  while (deque.size() > 1 && deque.peekFront() === deque.peekBack()) {
    deque.removeFront();
    deque.removeBack();
  }

  return deque.size() === 1;
}
