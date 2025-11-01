const highlights = [
  {
    title: "Nationwide Delivery",
    description: "Delivering to all 77 districts via our trusted logistics partners inside 3-5 days.",
    icon: "🚚",
  },
  {
    title: "Original Guarantee",
    description: "Only official merchandise direct from club suppliers. 7-day size exchange policy.",
    icon: "✅",
  },
  {
    title: "Dedicated Support",
    description: "Need help with sizing or payment? Our team is available 9am - 9pm, 7 days a week.",
    icon: "☎️",
  },
];

export const ServiceHighlights = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 transition hover:border-primary/40 hover:bg-white hover:shadow-soft"
          >
            <div className="text-3xl">{highlight.icon}</div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">{highlight.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
