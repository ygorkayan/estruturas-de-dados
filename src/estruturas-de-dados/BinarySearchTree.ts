export default class BinarySearchTree<T> {
  root: INodeOrNull<T>;

  constructor() {
    this.root = null;
  }

  insert(key: T): void {
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  search(key: T) {
    let current = this.root;

    while (current !== null) {
      if (current.key === key) {
        return true;
      }

      if (key > current.key) {
        current = current.right;
        continue;
      }

      if (key < current.key) {
        current = current.left;
        continue;
      }
    }

    return false;
  }

  inOrderTraverse(callback: callbackFn<T>): void {
    this.inOrderTraverseNode(this.root, callback);
  }

  preOrderTraverse(callback: callbackFn<T>): void {
    this.preOrderTraverseNode(this.root, callback);
  }

  postOrderTraverse(callback: callbackFn<T>): void {
    this.postOrderTraverseNode(this.root, callback);
  }

  min() {
    let current = this.root;

    while (current !== null && current.left !== null) {
      current = current.left;
    }

    return current?.key;
  }

  max() {
    let current = this.root;

    while (current !== null && current.right !== null) {
      current = current.right;
    }

    return current?.key;
  }

  remove(key: T) {}

  private insertNode(node: INode<T>, key: T): void {
    if (key < node.key) {
      if (node.left === null) {
        node.left = new Node<T>(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  private inOrderTraverseNode(node: INodeOrNull<T>, callback: callbackFn<T>): void {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  private preOrderTraverseNode(node: INodeOrNull<T>, callback: callbackFn<T>): void {
    if (node != null) {
      callback(node.key);
      this.inOrderTraverseNode(node.left, callback);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  private postOrderTraverseNode(node: INodeOrNull<T>, callback: callbackFn<T>): void {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      this.inOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
}

class Node<T> implements INode<T> {
  key: T;
  left: INodeOrNull<T>;
  right: INodeOrNull<T>;

  constructor(key: T) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

type callbackFn<T> = (key: T) => any;

type INodeOrNull<T> = INode<T> | null;

interface INode<T> {
  key: T;
  left: INodeOrNull<T>;
  right: INodeOrNull<T>;
}
