'use client';

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart-provider";
import { useOrders, type PaymentMethod } from "@/components/orders-provider";

const provinces = [
  "Province 1",
  "Madhesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

const schema = z.object({
  customerName: z.string().min(3, "Enter full name"),
  phone: z
    .string()
    .min(9, "Enter valid phone number")
    .regex(/^[0-9+]{9,15}$/, "Phone can only include digits or +"),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City or district is required"),
  province: z.string(),
  instructions: z.string().optional(),
  paymentMethod: z.enum(["cod", "esewa", "bank"]),
});

type FormValues = z.infer<typeof schema>;

const paymentLabels: Record<PaymentMethod, string> = {
  cod: "Cash on Delivery",
  esewa: "eSewa QR",
  bank: "Bank Transfer",
};

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [receiptPreview, setReceiptPreview] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string>();

  const orderTotal = useMemo(() => total + (total >= 6000 ? 0 : 200), [total]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      province: "Bagmati Province",
      paymentMethod: "cod",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    if (paymentMethod === "cod") {
      setReceiptPreview(undefined);
    }
  }, [paymentMethod]);

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
          <h1 className="text-3xl font-bold text-slate-900">Your cart is empty</h1>
          <p className="mt-3 text-sm text-slate-600">
            Add jerseys to your cart before completing checkout.
          </p>
          <Link
            href="/#catalogue"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90"
          >
            Browse Jerseys
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (data.paymentMethod !== "cod" && !receiptPreview) {
        form.setError("paymentMethod", {
          type: "manual",
          message: "Upload payment receipt for digital payments.",
        });
        return;
      }

      const orderId = `NJH-${Date.now()}`;
      addOrder({
        id: orderId,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email || undefined,
        address: data.address,
        city: data.city,
        province: data.province,
        instructions: data.instructions,
        paymentMethod: data.paymentMethod,
        paymentReceipt: receiptPreview,
        items,
        total: orderTotal,
        verified: data.paymentMethod === "cod",
        createdAt: Date.now(),
      });
      clearCart();
      setReceiptPreview(undefined);
      setSuccessOrderId(orderId);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      form.setError("paymentMethod", {
        type: "manual",
        message: "Only image files are allowed.",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setReceiptPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-slate-50 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="mt-2 text-sm text-slate-600">
            Delivery across Nepal within 3-5 working days. Our team will contact you for confirmation.
          </p>

          {successOrderId ? (
            <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-700">
              <h2 className="text-xl font-semibold">Order submitted successfully!</h2>
              <p className="mt-2 text-sm">
                Your order ID is <span className="font-semibold">{successOrderId}</span>. Our admin
                will verify the payment receipt and confirm over phone within 24 hours.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full border border-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  Back to home
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                  onClick={() => setSuccessOrderId(undefined)}
                >
                  Place another order
                </button>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    {...form.register("customerName")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., Sajan Shrestha"
                  />
                  {form.formState.errors.customerName && (
                    <p className="mt-1 text-xs text-rose-500">
                      {form.formState.errors.customerName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Phone</label>
                  <input
                    type="tel"
                    {...form.register("phone")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="+977 98XXXXXXXX"
                  />
                  {form.formState.errors.phone && (
                    <p className="mt-1 text-xs text-rose-500">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Email (optional)</label>
                  <input
                    type="email"
                    {...form.register("email")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="you@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-xs text-rose-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">City / District</label>
                  <input
                    type="text"
                    {...form.register("city")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Kathmandu"
                  />
                  {form.formState.errors.city && (
                    <p className="mt-1 text-xs text-rose-500">
                      {form.formState.errors.city.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Full Address</label>
                <textarea
                  {...form.register("address")}
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="House number, street, municipality"
                />
                {form.formState.errors.address && (
                  <p className="mt-1 text-xs text-rose-500">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Province</label>
                  <select
                    {...form.register("province")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Delivery Notes</label>
                  <input
                    type="text"
                    {...form.register("instructions")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Landmarks, preferred delivery time"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  Payment Method
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {(["cod", "esewa", "bank"] as PaymentMethod[]).map((method) => (
                    <label
                      key={method}
                      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold shadow-sm transition hover:border-primary/40"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          value={method}
                          {...form.register("paymentMethod")}
                          className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
                        />
                        <span className="text-slate-700">{paymentLabels[method]}</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {method === "cod" && "Pay cash when the courier arrives."}
                        {method === "esewa" && "Scan QR and upload your payment receipt below."}
                        {method === "bank" && "Transfer or deposit to our Nabil Bank account."}
                      </span>
                    </label>
                  ))}
                </div>
                {paymentMethod !== "cod" && (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-dashed border-primary/40 bg-white p-4 text-center">
                      <div className="relative mx-auto h-36 w-36">
                        <Image
                          src={
                            paymentMethod === "esewa"
                              ? "/payment/esewa-qr.svg"
                              : "/payment/bank-qr.svg"
                          }
                          alt={`${paymentLabels[paymentMethod]} QR`}
                          fill
                          className="object-contain"
                          sizes="144px"
                        />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        {paymentLabels[paymentMethod]} QR
                      </p>
                      <p className="text-xs text-slate-500">
                        Scan to pay. Save the payment receipt and upload here.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <label className="text-sm font-semibold text-slate-700">
                        Upload Payment Receipt
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReceiptUpload}
                        className="text-xs text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white file:shadow-soft file:transition file:hover:bg-primary/90"
                      />
                      {receiptPreview && (
                        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-slate-200">
                          <Image
                            src={receiptPreview}
                            alt="Receipt preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <p className="text-xs text-slate-500">
                        PNG, JPG up to 5 MB. Admin verifies receipts within 2 working hours.
                      </p>
                    </div>
                  </div>
                )}
                {form.formState.errors.paymentMethod && (
                  <p className="mt-3 text-xs text-rose-500">
                    {form.formState.errors.paymentMethod.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Place Order"}
              </button>
              <p className="text-center text-xs text-slate-400">
                By placing an order you agree to our terms &amp; refund policy.
              </p>
            </form>
          )}
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-800">Order Summary</h2>
            <ul className="mt-4 space-y-4">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      Size {item.size} • Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{total >= 6000 ? "Free" : "Rs. 200"}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>Rs. {orderTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-800">Need Help?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Call us at <strong>+977 980-0000000</strong> or message on Viber / WhatsApp for
              support with your payment receipt or delivery.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-500">
              <li>• Orders dispatched daily from Kathmandu logistics hub</li>
              <li>• Exchanges accepted within 7 days for unused jerseys</li>
              <li>• COD available in all major cities and towns</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
