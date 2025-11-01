import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const ProductGrid = () => (
  <section id="catalogue" className="bg-slate-50 py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Featured Jerseys</h2>
          <p className="mt-2 text-sm text-slate-600">
            Authentic fan and player edition kits. Limited stocks available for the new season drops.
          </p>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Free Delivery above Rs. 6,000
        </p>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);
