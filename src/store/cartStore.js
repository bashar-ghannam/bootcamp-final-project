import { observable, computed, action, makeObservable } from 'mobx';
import { orderStore } from './orderStore';

export class cartStore {
  constructor() {
    this.order = [];

    makeObservable(this, {
      order: observable,
      totalQuantities: computed,
      totalSum: computed,
      removeIeam: action,
      addIeam: action,
      updateIeam: action,
      emptyCart: action,
    });
  }

  get totalQuantities() {
    let counter = 0;
    this.order.forEach((item) => (counter += item.quantity));
    return counter;
  }

  get totalSum() {
    let sum = 0;
    this.order.forEach((item) => (sum += item.quantity * item.price));
    return sum;
  }

  emptyCart = () => {
    this.order = [];
  };

  updateIeam = (id, quantity) => {
    this.order.find((item) => item.id === id).quantity = quantity;
  };

  getQuantity = (id) => {
    return this.order.find((item) => item.id === id).quantity;
  };

  removeIeam = (id) => {
    this.order = this.order.filter((item) => item.id !== id);
  };

  addIeam = (name, price, img) => {
    const item = this.order.find(
      (item) => item.name === name && item.price === price
    );
    if (item) {
      this.updateIeam(item.id, item.quantity + 1);
    } else {
      this.order.push(new orderStore(name, price, img));
    }
  };
}
