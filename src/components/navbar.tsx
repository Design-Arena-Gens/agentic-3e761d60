'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/#catalogue", label: "Catalogue" },
  { href: "/checkout", label: "Checkout" },
  { href: "/admin", label: "Admin" },
];

export const Navbar = () => {
  const { items } = useCart();
  const pathname = usePathname();

  const totalItems = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <ShoppingBag className="h-6 w-6" />
          <span>Nepal Jersey Hub</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "transition hover:text-primary",
                pathname === link.href && "text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            {totalItems > 0 && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-primary">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90 sm:hidden"
        >
          <ShoppingBag className="h-4 w-4" />
          {totalItems > 0 && <span>{totalItems}</span>}
        </Link>
      </nav>
    </header>
  );
};
