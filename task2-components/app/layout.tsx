import './globals.css';

export const metadata = {
  title: 'Component SDK Demo',
  description: 'A reusable component library example',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
