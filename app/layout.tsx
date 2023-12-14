import './globals.css'


export const metadata = {
  metadataBase: new URL('https://postgres-prisma.vercel.app'),
  title: 'Vercel Postgres Demo with Prisma',
  description:
    'A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
