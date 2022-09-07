import { makeObservable, observable } from 'mobx';

export class orderStore {
  constructor(name, price, img) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.quantity = 1;
    this.id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(2, 10);

    makeObservable(this, {
      name: observable,
      id: observable,
      price: observable,
      img: observable,
      quantity: observable,
    });
  }
}
