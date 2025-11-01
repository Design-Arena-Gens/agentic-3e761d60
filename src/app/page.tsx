import { Hero } from "@/components/hero";
import { ServiceHighlights } from "@/components/service-highlights";
import { ProductGrid } from "@/components/product-grid";
import { PaymentOptions } from "@/components/payment-options";
import { OrderProcess } from "@/components/order-process";

const HomePage = () => (
  <>
    <Hero />
    <ServiceHighlights />
    <ProductGrid />
    <PaymentOptions />
    <OrderProcess />
  </>
);

export default HomePage;
