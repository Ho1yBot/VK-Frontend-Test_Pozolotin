import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface Item {
  id: number;
  name: string;
}

export class ListStore {
  items: Item[] = [];
  loading: boolean = false;
  error: string | null = null;
  page: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchItems() {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.page}`
      );
      this.items = [...this.items, ...response.data.items];
      this.page += 1;
    } catch (error) {
      this.error = "Ошибка при загрузке данных";
    } finally {
      this.loading = false;
    }
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  editItem(id: number, newName: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      this.items[itemIndex] = { ...this.items[itemIndex], name: newName };
    }
  }
}

export default new ListStore();
