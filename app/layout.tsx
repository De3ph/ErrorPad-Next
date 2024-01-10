import "./globals.css"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Sidebar from "@/components/sidebar"
import fetchUserData from "./methods/fetchuserdata"
import { Montserrat } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "eRRoRpad",
  description: "Lets Solve the Errors Together"
}

const montserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: ["latin"]
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user }
  } = await supabase.auth.getUser()
  let userData = null
  if (user) userData = await fetchUserData(user.id)

  return (
    <html lang='en' className={montserrat.className}>
      <body className='grid bg-background text-black'>
        <header>
          <Header user={userData} />
        </header>

        <main className='flex flex-col md:flex-row place-self-stretch min-h-screen'>
          <nav className='w-full md:w-auto md:h-full max-w-screen-sm py-2'>
            {userData ? <Sidebar user={userData} /> : <></>}
          </nav>

          <section className='pt-10 px-8 w-full'>{children}</section>
        </main>

        <footer className='w-full grid items-stretch'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
