const steps = [
  {
    title: "Select Your Jersey",
    description: "Choose from top club and national team kits with multiple size options in stock.",
    number: "01",
  },
  {
    title: "Confirm Delivery Details",
    description:
      "Enter your full address, district, and preferred delivery instructions for smooth dispatch.",
    number: "02",
  },
  {
    title: "Choose Payment Method",
    description:
      "Pay with COD, eSewa, or bank transfer. Upload your receipt if you pick a digital option.",
    number: "03",
  },
  {
    title: "Admin Verification",
    description:
      "Our admin verifies the payment receipt and confirms shipping with tracking updates over SMS.",
    number: "04",
  },
];

export const OrderProcess = () => (
  <section className="bg-slate-900 py-20 text-white">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold sm:text-4xl">How Ordering Works</h2>
      <p className="mt-4 max-w-2xl text-sm text-slate-300">
        We keep the process transparent from cart to delivery. Track each step as our team fulfils
        your order and verifies digital payments.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.number}
            className="glass relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6"
          >
            <span className="text-5xl font-black text-white/20">{step.number}</span>
            <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-200">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
