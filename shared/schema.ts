import { pgTable, text, varchar, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const laundryTypes = ["Wash", "Iron", "Wash & Iron", "Dry Clean"] as const;
export type LaundryType = typeof laundryTypes[number];

export const orderStatuses = ["Pending", "Processing", "Completed"] as const;
export type OrderStatus = typeof orderStatuses[number];

export const orders = pgTable("orders", {
  id: varchar("id", { length: 36 }).primaryKey(),
  customerName: text("customer_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  laundryType: text("laundry_type").notNull(),
  weight: real("weight").notNull(),
  status: text("status").notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true }).extend({
  customerName: z.string().min(2, "Customer name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  laundryType: z.enum(laundryTypes),
  weight: z.number().min(0.1, "Weight must be at least 0.1 kg"),
  status: z.enum(orderStatuses),
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
