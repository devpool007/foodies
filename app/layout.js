import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
