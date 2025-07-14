import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import ShopContextProvider from "@/hooks/UseShopContext";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const pathname = useLocation().pathname;
  return (
    <ShopContextProvider>
      <div className="min-h-screen bg-white">
        {pathname !== "/authentication" && <Navigation />}
        <main className="">
          <Outlet />
        </main>
        <Toaster />
        {pathname !== "/authentication" && <Footer />}
      </div>
    </ShopContextProvider>
  );
}
