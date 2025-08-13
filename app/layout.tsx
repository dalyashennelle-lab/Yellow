import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yellow Project',
  description: 'Yellow project application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
