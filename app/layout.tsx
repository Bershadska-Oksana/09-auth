// app/layout.tsx
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "NoteHub",
  description: "NoteHub app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
