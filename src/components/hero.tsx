import Link from "next/link";

export const Hero = () => (
  <section className="gradient-bg relative overflow-hidden py-20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,86,219,0.2),_transparent_50%)]" />
    <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
      <div className="flex-1 space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary shadow-soft">
          New Season • 2024/25 Jerseys
        </span>
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Authentic Football Jerseys Delivered Anywhere in Nepal
        </h1>
        <p className="max-w-xl text-lg text-slate-600">
          Choose from the latest club and national team jerseys. Pay with Cash on Delivery, eSewa, or
          bank transfer and get your jersey delivered to your doorstep within 3-5 working days.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/#catalogue"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90"
          >
            Browse Catalogue
          </Link>
          <Link
            href="/checkout"
            className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary"
          >
            Fast Checkout
          </Link>
        </div>
      </div>
      <div className="relative flex-1">
        <div className="glass relative mx-auto max-w-md rounded-3xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Flexible Payments
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            COD • eSewa • Bank Transfer
          </h2>
          <p className="mt-4 text-sm text-slate-600">
            Scan the QR on checkout for digital payments or pay cash when you receive your package.
            Upload your receipt for instant verification by our team.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs font-semibold uppercase text-slate-500">
            <div className="rounded-2xl bg-slate-100 px-3 py-4 text-slate-700">
              Nationwide Delivery
            </div>
            <div className="rounded-2xl bg-slate-100 px-3 py-4 text-slate-700">Original Quality</div>
            <div className="rounded-2xl bg-slate-100 px-3 py-4 text-slate-700">Verified Secure</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
