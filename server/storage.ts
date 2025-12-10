import { type User, type InsertUser, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: InsertOrder): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    
    this.seedOrders();
  }

  private seedOrders() {
    const sampleOrders: InsertOrder[] = [
      {
        customerName: "Alice Johnson",
        phoneNumber: "+1 (555) 123-4567",
        laundryType: "Wash & Iron",
        weight: 4.5,
        status: "Completed",
      },
      {
        customerName: "Bob Smith",
        phoneNumber: "+1 (555) 234-5678",
        laundryType: "Dry Clean",
        weight: 2.0,
        status: "Processing",
      },
      {
        customerName: "Carol White",
        phoneNumber: "+1 (555) 345-6789",
        laundryType: "Wash",
        weight: 6.2,
        status: "Pending",
      },
      {
        customerName: "David Brown",
        phoneNumber: "+1 (555) 456-7890",
        laundryType: "Iron",
        weight: 3.0,
        status: "Completed",
      },
      {
        customerName: "Eva Martinez",
        phoneNumber: "+1 (555) 567-8901",
        laundryType: "Wash & Iron",
        weight: 5.5,
        status: "Processing",
      },
    ];

    for (const orderData of sampleOrders) {
      const id = randomUUID();
      const order: Order = { ...orderData, id };
      this.orders.set(id, order);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, insertOrder: InsertOrder): Promise<Order | undefined> {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) {
      return undefined;
    }
    const updatedOrder: Order = { ...insertOrder, id };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }
}

export const storage = new MemStorage();
