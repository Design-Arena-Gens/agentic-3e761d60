import Image from "next/image";

const payments = [
  {
    title: "Cash on Delivery",
    description:
      "Pay when your jersey arrives. Available in all major cities and most rural municipalities.",
    details: ["No advance required", "Verify product before paying", "Ideal for first-time buyers"],
    icon: "💵",
  },
  {
    title: "eSewa QR",
    description:
      "Scan our official eSewa QR during checkout and upload the receipt for instant confirmation.",
    details: ["Instant confirmation", "Cashback eligible on eSewa", "Upload receipt screenshot"],
    icon: "📲",
  },
  {
    title: "Bank Transfer",
    description:
      "Transfer to our Nabil Bank account using mobile banking, ATM, or cash deposit slip.",
    details: ["Account: Nepal Jersey Hub Pvt. Ltd.", "Branch: Kathmandu", "Swift: NARBNPKA"],
    icon: "🏦",
  },
];

export const PaymentOptions = () => (
  <section className="bg-white py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Flexible Payment Choices</h2>
          <p className="mt-4 text-lg text-slate-600">
            Pick the method that works best for you. We support Nepal&apos;s most trusted payment
            services with a quick admin verification process to get your order dispatched faster.
          </p>
          <div className="mt-8 space-y-6">
            {payments.map((payment) => (
              <div
                key={payment.title}
                className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 transition hover:border-primary/50 hover:bg-white hover:shadow-soft"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{payment.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{payment.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{payment.description}</p>
                    <ul className="mt-3 space-y-1 text-sm text-slate-500">
                      {payment.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass relative rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Sample QR Codes
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Scan &amp; Pay</h3>
          <p className="mt-3 text-sm text-slate-600">
            Customers scanning these QR codes upload their payment receipts during checkout. Admin
            can verify and confirm orders instantly.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-primary/40 bg-white p-4 text-center">
              <div className="relative mx-auto h-40 w-40">
                <Image src="/payment/esewa-qr.svg" alt="eSewa QR" fill className="object-contain" sizes="160px" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">eSewa QR</p>
              <p className="text-xs text-slate-500">Account: Nepal Jersey Hub</p>
            </div>
            <div className="rounded-2xl border border-dashed border-primary/40 bg-white p-4 text-center">
              <div className="relative mx-auto h-40 w-40">
                <Image src="/payment/bank-qr.svg" alt="Bank QR" fill className="object-contain" sizes="160px" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">Bank QR</p>
              <p className="text-xs text-slate-500">Nabil Bank • Kathmandu Branch</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Actual QR codes will be provided by the store owner. Customers must upload payment
            receipts for faster dispatch.
          </p>
        </div>
      </div>
    </div>
  </section>
);
