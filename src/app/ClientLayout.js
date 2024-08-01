"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/AuthProvider/AuthProvider";
import Navbar from "@/components/shared/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/redux/store/store";

const inter = Poppins({
  weight: ["200", "400", "500", "700"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <html lang="en">
            <body className={inter.className}>
              <div>
                <Navbar />
              </div>
              <main>{children}</main>
            </body>
          </html>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}
