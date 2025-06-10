import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { paymentDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Process payment
  app.post("/api/payment/process", async (req, res) => {
    try {
      const validatedData = paymentDataSchema.parse(req.body);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const transaction = await storage.createPaymentTransaction(validatedData);
      
      res.json({
        success: true,
        transaction,
        message: "Payment processed successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Payment processing failed"
        });
      }
    }
  });

  // Get transaction details
  app.get("/api/payment/transaction/:transactionId", async (req, res) => {
    try {
      const { transactionId } = req.params;
      const transaction = await storage.getPaymentTransaction(transactionId);
      
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found"
        });
      }
      
      res.json({
        success: true,
        transaction
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve transaction"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
