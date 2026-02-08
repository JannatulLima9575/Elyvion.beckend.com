import { Router } from "express";
import {
  loginCustomer,
  getCustomers,
  getCustomerProfile,
  getCustomerDetail,
  updateCustomerSettings,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = Router();

// Customer login 
router.post("/login", loginCustomer);

// Get all customers 
router.get("/", getCustomers);

// Create customer
router.post("/", createCustomer);

// Get customer profile
router.get("/:id/profile", getCustomerProfile);

// Get customer detail
router.get("/:id/detail", getCustomerDetail);

// Update customer settings
router.patch("/:id/settings", updateCustomerSettings);

// Update customer
router.patch("/:id", updateCustomer);

// Delete customer
router.delete("/:id", deleteCustomer);

export default router;

