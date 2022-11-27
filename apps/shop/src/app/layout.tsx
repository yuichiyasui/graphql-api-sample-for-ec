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
        <div className="flex flex-col min-h-screen">
          <header className="border-b border-b-gray-100">
            <div className="max-w-7xl mx-auto py-4 px-4">
              <h1 className="font-bold text-xl">Shopping App Sample</h1>
            </div>
          </header>
          <main className="mx-auto max-w-7xl w-full">{children}</main>
          <footer className="mt-auto border-t border-t-gray-100 py-4 grid justify-items-center">
            <p className="text-gray-700">© Shopping App Sample 2022</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
