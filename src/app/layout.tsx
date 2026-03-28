import Header from "@/components/Header/Header";
import FloatingWidgets from "@/components/FloatingWidgets/FloatingWidgets";
import GreenFooter from "@/components/Footer/GreenFooter";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <GreenFooter />
        <FloatingWidgets />
      </body>
    </html>
  );
}
