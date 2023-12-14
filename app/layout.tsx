import './globals.css'


export const metadata = {
  metadataBase: new URL('https://todolistv5.vercel.app/'),
  title: 'The best todo list app there is',
  description:
    'simple yet stupid',
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
