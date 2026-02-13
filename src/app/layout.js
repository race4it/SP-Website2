export const metadata = {
  title: 'Speedpoint | Performance Shop Management Software',
  description: 'The only shop management platform built for automotive performance shops. Manage builds, source from 12+ vendors, and give customers a real-time portal.',
  openGraph: {
    title: 'Speedpoint | Performance Shop Management Software',
    description: 'From quote to dyno. One platform. Manage every build in the shop management platform designed for performance.',
    url: 'https://getspeedpoint.com',
    siteName: 'Speedpoint',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
