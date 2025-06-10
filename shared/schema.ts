import { pgTable, text, serial, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const paymentTransactions = pgTable("payment_transactions", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull().unique(),
  policyNumber: text("policy_number").notNull(),
  coverageType: text("coverage_type").notNull(),
  paymentFrequency: text("payment_frequency").notNull(),
  premiumAmount: decimal("premium_amount", { precision: 10, scale: 2 }).notNull(),
  processingFee: decimal("processing_fee", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  streetAddress: text("street_address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  coverageDetails: text("coverage_details"),
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const policyInformationSchema = z.object({
  policyNumber: z.string().min(1, "Policy number is required"),
  coverageType: z.string().min(1, "Coverage type is required"),
  paymentFrequency: z.string().min(1, "Payment frequency is required"),
  premiumAmount: z.coerce.number().positive("Premium amount must be positive"),
  coverageDetails: z.string().optional(),
});

export const personalInformationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Please enter a valid phone number"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
});

export const paymentDataSchema = policyInformationSchema.merge(personalInformationSchema);

export const insertPaymentTransactionSchema = createInsertSchema(paymentTransactions).omit({
  id: true,
  transactionId: true,
  processingFee: true,
  tax: true,
  totalAmount: true,
  status: true,
  createdAt: true,
});

export type PolicyInformation = z.infer<typeof policyInformationSchema>;
export type PersonalInformation = z.infer<typeof personalInformationSchema>;
export type PaymentData = z.infer<typeof paymentDataSchema>;
export type InsertPaymentTransaction = z.infer<typeof insertPaymentTransactionSchema>;
export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
