
import { format } from "date-fns";

// Orders mock data
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  reference: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
}

export const orders: Order[] = [
  {
    id: "1",
    reference: "ORD-001-2023",
    customer: "Acme Corp",
    date: format(new Date(2023, 6, 15), "PP"),
    total: 1250.99,
    status: "delivered",
    items: 5,
  },
  {
    id: "2",
    reference: "ORD-002-2023",
    customer: "Acme Corp",
    date: format(new Date(2023, 7, 2), "PP"),
    total: 899.50,
    status: "shipped",
    items: 3,
  },
  {
    id: "3",
    reference: "ORD-003-2023",
    customer: "Acme Corp",
    date: format(new Date(2023, 8, 18), "PP"),
    total: 2499.99,
    status: "processing",
    items: 8,
  },
  {
    id: "4",
    reference: "ORD-004-2023",
    customer: "Acme Corp",
    date: format(new Date(2023, 9, 4), "PP"),
    total: 149.99,
    status: "pending",
    items: 1,
  },
  {
    id: "5",
    reference: "ORD-005-2023",
    customer: "Acme Corp",
    date: format(new Date(2023, 9, 10), "PP"),
    total: 499.95,
    status: "cancelled",
    items: 2,
  },
  {
    id: "6",
    reference: "ORD-006-2023",
    customer: "Acme Corp",
    date: format(new Date(2023, 10, 1), "PP"),
    total: 799.99,
    status: "pending",
    items: 4,
  },
  {
    id: "7",
    reference: "ORD-007-2023",
    customer: "Acme Corp",
    date: format(new Date(2023, 10, 15), "PP"),
    total: 1299.50,
    status: "processing",
    items: 6,
  },
];

// Inventory mock data
export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stockLevel: number;
  reorderPoint: number;
  unitPrice: number;
  lastUpdated: string;
}

export const inventory: InventoryItem[] = [
  {
    id: "1",
    sku: "PRD-001",
    name: "Widget Type A",
    category: "Widgets",
    stockLevel: 250,
    reorderPoint: 50,
    unitPrice: 19.99,
    lastUpdated: format(new Date(2023, 9, 15), "PP"),
  },
  {
    id: "2",
    sku: "PRD-002",
    name: "Widget Type B",
    category: "Widgets",
    stockLevel: 180,
    reorderPoint: 40,
    unitPrice: 24.99,
    lastUpdated: format(new Date(2023, 9, 12), "PP"),
  },
  {
    id: "3",
    sku: "PRD-003",
    name: "Gadget X1",
    category: "Gadgets",
    stockLevel: 75,
    reorderPoint: 25,
    unitPrice: 49.99,
    lastUpdated: format(new Date(2023, 9, 10), "PP"),
  },
  {
    id: "4",
    sku: "PRD-004",
    name: "Gadget X2 Pro",
    category: "Gadgets",
    stockLevel: 32,
    reorderPoint: 20,
    unitPrice: 99.99,
    lastUpdated: format(new Date(2023, 9, 8), "PP"),
  },
  {
    id: "5",
    sku: "PRD-005",
    name: "Component Z",
    category: "Components",
    stockLevel: 420,
    reorderPoint: 100,
    unitPrice: 9.99,
    lastUpdated: format(new Date(2023, 9, 5), "PP"),
  },
  {
    id: "6",
    sku: "PRD-006",
    name: "Component Y",
    category: "Components",
    stockLevel: 15,
    reorderPoint: 50,
    unitPrice: 14.99,
    lastUpdated: format(new Date(2023, 9, 1), "PP"),
  },
  {
    id: "7",
    sku: "PRD-007",
    name: "Premium Package",
    category: "Packages",
    stockLevel: 50,
    reorderPoint: 10,
    unitPrice: 199.99,
    lastUpdated: format(new Date(2023, 8, 28), "PP"),
  },
];

// Users mock data
export type UserRole = "admin" | "manager" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  lastLogin: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    role: "admin",
    status: "active",
    lastLogin: format(new Date(2023, 10, 15), "PPp"),
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@acmecorp.com",
    role: "manager",
    status: "active",
    lastLogin: format(new Date(2023, 10, 14), "PPp"),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@acmecorp.com",
    role: "viewer",
    status: "active",
    lastLogin: format(new Date(2023, 10, 10), "PPp"),
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@acmecorp.com",
    role: "manager",
    status: "inactive",
    lastLogin: format(new Date(2023, 9, 28), "PPp"),
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@acmecorp.com",
    role: "viewer",
    status: "active",
    lastLogin: format(new Date(2023, 10, 12), "PPp"),
  },
];

// Notifications mock data
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  date: string;
  read: boolean;
}

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Low stock alert",
    message: "Component Y has dropped below the reorder point.",
    type: "warning",
    date: format(new Date(2023, 10, 14), "PPp"),
    read: false,
  },
  {
    id: "2",
    title: "Order shipped",
    message: "Order #ORD-002-2023 has been shipped and is on its way.",
    type: "info",
    date: format(new Date(2023, 10, 13), "PPp"),
    read: false,
  },
  {
    id: "3",
    title: "New order received",
    message: "A new order #ORD-007-2023 has been placed.",
    type: "success",
    date: format(new Date(2023, 10, 12), "PPp"),
    read: true,
  },
  {
    id: "4",
    title: "Payment failed",
    message: "Payment for order #ORD-005-2023 has failed. Please check payment details.",
    type: "error",
    date: format(new Date(2023, 10, 10), "PPp"),
    read: true,
  },
  {
    id: "5",
    title: "User account updated",
    message: "User Mike Johnson has updated their account details.",
    type: "info",
    date: format(new Date(2023, 10, 8), "PPp"),
    read: true,
  },
];

// Reports mock data
export interface Report {
  id: string;
  name: string;
  description: string;
  category: "inventory" | "orders" | "financial" | "users";
  lastGenerated: string;
  format: "PDF" | "CSV" | "Excel";
}

export const reports: Report[] = [
  {
    id: "1",
    name: "Monthly Inventory Summary",
    description: "Summary of inventory levels, movements, and valuation",
    category: "inventory",
    lastGenerated: format(new Date(2023, 9, 31), "PP"),
    format: "Excel",
  },
  {
    id: "2",
    name: "Order Fulfillment Report",
    description: "Analysis of order processing and fulfillment times",
    category: "orders",
    lastGenerated: format(new Date(2023, 9, 31), "PP"),
    format: "PDF",
  },
  {
    id: "3",
    name: "Financial Summary",
    description: "Overview of revenue, costs, and margins",
    category: "financial",
    lastGenerated: format(new Date(2023, 9, 31), "PP"),
    format: "Excel",
  },
  {
    id: "4",
    name: "User Activity Log",
    description: "Detailed log of user activities and system access",
    category: "users",
    lastGenerated: format(new Date(2023, 10, 15), "PP"),
    format: "CSV",
  },
  {
    id: "5",
    name: "Stock Level Alerts",
    description: "List of products at or below reorder points",
    category: "inventory",
    lastGenerated: format(new Date(2023, 10, 14), "PP"),
    format: "PDF",
  },
];
