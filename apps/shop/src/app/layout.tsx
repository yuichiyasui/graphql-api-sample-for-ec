import '~/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <header>Shopping App Sample</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
