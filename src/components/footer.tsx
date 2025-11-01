import Link from "next/link";

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-white">
    <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-slate-700">Delivery across Nepal</p>
          <p>Authentic jerseys delivered to all 77 districts within 3-5 working days.</p>
        </div>
        <div className="flex flex-col items-start gap-2 text-slate-600 sm:items-end">
          <Link href="tel:+9779800000000" className="hover:text-primary">
            +977 980-0000000
          </Link>
          <Link href="mailto:sales@nepaljerseyhub.com" className="hover:text-primary">
            sales@nepaljerseyhub.com
          </Link>
          <span>Putalisadak, Kathmandu, Nepal</span>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Nepal Jersey Hub. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
