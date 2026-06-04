import fs from 'fs/promises';
import path from 'path';
import { Order } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

export class StorageService {
  static async ensureDataDir(): Promise<void> {
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
  }

  static async getOrders(): Promise<Order[]> {
    await this.ensureDataDir();

    try {
      const data = await fs.readFile(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static async saveOrder(order: Order): Promise<void> {
    await this.ensureDataDir();

    const orders = await this.getOrders();
    orders.push(order);

    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  }

  static async updateOrder(orderId: string, updates: Partial<Order>): Promise<void> {
    await this.ensureDataDir();

    const orders = await this.getOrders();
    const index = orders.findIndex(o => o.orderId === orderId || o.payuOrderId === orderId);

    if (index !== -1) {
      orders[index] = {
        ...orders[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
    }
  }

  static async getOrderByOrderId(orderId: string): Promise<Order | null> {
    const orders = await this.getOrders();
    return orders.find(o => o.orderId === orderId) || null;
  }

  static async getOrderByPayUId(payuOrderId: string): Promise<Order | null> {
    const orders = await this.getOrders();
    return orders.find(o => o.payuOrderId === payuOrderId) || null;
  }
}
