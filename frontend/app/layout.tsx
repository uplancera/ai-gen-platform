export const metadata = {
  title: 'AI Generation Platform',
  description: 'Internal AI image generation starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#0b1220', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
