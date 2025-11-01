'use client';

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
          <Link
            href="/"
            className="text-sm font-semibold text-primary transition hover:text-primary/80"
          >
            Continue shopping
          </Link>
        </div>
        {items.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-lg font-semibold text-slate-700">Your cart is empty.</p>
            <p className="mt-2 text-sm text-slate-500">
              Browse our catalogue to add jerseys and checkout in minutes.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex flex-col gap-6 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="relative h-32 w-full overflow-hidden rounded-xl sm:h-28 sm:w-28">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                          Size {item.size}
                        </p>
                        <h2 className="text-lg font-semibold text-slate-800">{item.name}</h2>
                      </div>
                      <p className="text-lg font-semibold text-slate-700">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded-full border border-slate-200">
                        <button
                          type="button"
                          className="px-3 py-1 text-lg text-slate-500 hover:text-primary"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        >
                          –
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-slate-700">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 text-lg text-slate-500 hover:text-primary"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-rose-500"
                        onClick={() => removeItem(item.id, item.size)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Order Total</p>
                <p className="text-3xl font-bold text-slate-900">Rs. {total.toLocaleString()}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Delivery inside Kathmandu Valley: Rs. 150 | Outside Valley: Rs. 200
                </p>
              </div>
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
