import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { OrdersProvider } from "@/components/orders-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nepal Jersey Hub",
  description:
    "Shop premium football jerseys in Nepal with nationwide delivery and flexible payment options including COD, eSewa, and bank transfer.",
  metadataBase: new URL("https://agentic-3e761d60.vercel.app"),
  openGraph: {
    title: "Nepal Jersey Hub",
    description:
      "Authentic football jerseys with delivery across Nepal. Pay via Cash on Delivery, eSewa, or bank transfer.",
    url: "https://agentic-3e761d60.vercel.app",
    siteName: "Nepal Jersey Hub",
    locale: "en_US",
    type: "website",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className={`${inter.className} min-h-screen flex flex-col`}>
      <OrdersProvider>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </OrdersProvider>
    </body>
  </html>
);

export default RootLayout;
