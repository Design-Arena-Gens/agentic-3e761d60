'use client';

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:border-primary/60">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        {product.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
            Best Seller
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25rem] text-primary">{product.club}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-800">{product.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{product.description}</p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-semibold transition",
                  selectedSize === size
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary",
                )}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-slate-800">Rs. {product.price.toLocaleString()}</span>
            <div className="flex items-center rounded-full border border-slate-200">
              <button
                type="button"
                className="px-3 py-1 text-lg text-slate-500 hover:text-primary"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                –
              </button>
              <span className="w-10 text-center text-sm font-semibold text-slate-700">{quantity}</span>
              <button
                type="button"
                className="px-3 py-1 text-lg text-slate-500 hover:text-primary"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-auto flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90 disabled:bg-slate-300"
        >
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
};
