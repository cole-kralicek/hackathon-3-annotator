import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import { LTRemarkRegular } from '../../styles/fonts'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import "@/app/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <ClerkProvider>
        <body className={LTRemarkRegular.className}>
          <Nav />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
          <Footer />
        </body>
        </ClerkProvider>
      </html>
  )
}