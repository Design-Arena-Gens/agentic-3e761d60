'use client';

import Image from "next/image";
import { useOrders } from "@/components/orders-provider";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const AdminPage = () => {
  const { orders, toggleVerification } = useOrders();

  return (
    <div className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
            <p className="mt-2 text-sm text-slate-600">
              Review customer orders and verify payment receipts for eSewa and bank transfers.
            </p>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 shadow-soft">
            Total Orders: {orders.length}
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
            <h2 className="text-xl font-semibold text-slate-800">No orders yet</h2>
            <p className="mt-2 text-sm text-slate-500">
              Orders placed through the checkout form will appear here for verification.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:border-primary/50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                      {order.paymentMethod.toUpperCase()}
                    </p>
                    <h2 className="text-xl font-semibold text-slate-900">{order.customerName}</h2>
                    <p className="text-sm text-slate-600">
                      {order.city}, {order.province}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Placed on {format(order.createdAt, "dd MMM yyyy • hh:mm a")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest",
                        order.verified
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700",
                      )}
                    >
                      {order.verified ? "Verified" : "Pending"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleVerification(order.id)}
                      className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                      {order.verified ? "Mark as Pending" : "Mark as Verified"}
                    </button>
                  </div>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">Ordered Items</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {order.items.map((item) => (
                        <li
                          key={`${order.id}-${item.id}-${item.size}`}
                          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                        >
                          <div>
                            <p className="font-semibold text-slate-700">{item.name}</p>
                            <p className="text-xs text-slate-500">
                              Size {item.size} • Qty {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-slate-700">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                    {order.instructions && (
                      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600">
                        <p className="font-semibold text-slate-700">Delivery Instructions</p>
                        <p className="mt-1">{order.instructions}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-700">Phone:</span> {order.phone}
                      </p>
                      {order.email && (
                        <p className="mt-1">
                          <span className="font-semibold text-slate-700">Email:</span> {order.email}
                        </p>
                      )}
                      <p className="mt-1">
                        <span className="font-semibold text-slate-700">Address:</span>{" "}
                        {order.address}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        Order Total: Rs. {order.total.toLocaleString()}
                      </p>
                    </div>
                    {order.paymentReceipt ? (
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-700">Uploaded Receipt</p>
                        <div className="mt-3 relative h-60 w-full overflow-hidden rounded-xl border border-slate-200">
                          <Image
                            src={order.paymentReceipt}
                            alt="Payment receipt"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          Verify the sender name and transaction ID before confirming.
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        <p className="font-semibold">No receipt uploaded</p>
                        <p className="mt-1 text-xs">
                          This COD order can be verified after customer confirmation call.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
