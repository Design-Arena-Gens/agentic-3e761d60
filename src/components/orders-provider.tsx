'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/components/cart-provider";

export type PaymentMethod = "cod" | "esewa" | "bank";

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  province: string;
  instructions?: string;
  paymentMethod: PaymentMethod;
  paymentReceipt?: string;
  items: CartItem[];
  total: number;
  verified: boolean;
  createdAt: number;
};

type OrdersContextValue = {
  orders: Order[];
  addOrder: (order: Order) => void;
  toggleVerification: (orderId: string) => void;
};

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

const STORAGE_KEY = "njh-orders";

type OrdersProviderProps = {
  children: React.ReactNode;
};

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Order[];
        setOrders(parsed);
      } catch (error) {
        console.warn("Failed to parse stored orders", error);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const toggleVerification = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, verified: !order.verified } : order,
      ),
    );
  };

  const value = useMemo(
    () => ({
      orders,
      addOrder,
      toggleVerification,
    }),
    [orders],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
