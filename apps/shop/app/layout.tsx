import Link from 'next/link';
import '~/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <header className="border-b border-b-gray-100 bg-white">
            <div className="max-w-7xl mx-auto py-4 px-4 flex items-center">
              <Link href="/">
                <h1 className="font-bold text-xl">Shopping App Sample</h1>
              </Link>
              <nav className="ml-auto">
                <ul>
                  <li>
                    <Link
                      href="/sign-up/email"
                      className="text-sm hover:text-gray-800/50 text-gray-800"
                    >
                      会員登録
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-7xl w-full">{children}</main>
          <footer className="mt-auto border-t border-t-gray-100 py-4 grid justify-items-center bg-white">
            <p className="text-gray-700">© Shopping App Sample 2022</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
