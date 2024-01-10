import React from "react"
import featuresImage from "@/images/features.png"
import benefitsImage from "@/images/benefits.png"
import solutionsImage from "@/images/solutions.png"
import Image from "next/image"
import Pricing from "./pricing"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { IconBug } from "@tabler/icons-react"

const Home = async () => {
  const supabase = createServerComponentClient({ cookies })
  const session = await supabase.auth.getSession()

  if (session.data.session != null) {
    redirect("/myErrors")
  }
  const features = [
    "Identify software errors instantly.",
    "Optimize your development processes.",
    "Enhance reliability of your enterprise software.",
    "Fast and effective analysis with user-friendly interface."
  ]

  const benefits = [
    "Quick error detection and resolution.",
    "Visible increase in software quality.",
    "Improve your corporate processes.",
    "Boost customer satisfaction with reliable software."
  ]

  const corporateSolution = [
    "Optimize your business processes.",
    "Provide a more effective working environment for your team.",
    "Use the right tool to increase your project's success."
  ]

  return (
    <div className='container mx-auto mt-8 space-y-32'>
      <div className='w-full text-center text-2xl space-y-4 font-bold p-16'>
        <p className='text-6xl'>ErrorPad</p>
        <p className='font-semibold flex justify-center items-center gap-1'>
          A New Approach to Analyze{" "}
          <span className='inline'>
            <IconBug className='hover:text-green-400' />
          </span>
        </p>
      </div>
      <section className='flex justify-between items-center'>
        <div>
          <h2 className='text-3xl font-semibold mb-4'>Features</h2>
          <ul className='text-lg list-disc list-inside'>
            {features.map((feature, index) => (
              <li key={index} className='mb-2'>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={featuresImage}
          className='w-[50%] h-auto'
          alt='features.png'
        />
      </section>

      <section className='flex justify-between items-center '>
        <Image
          src={benefitsImage}
          className='w-[50%] h-auto'
          alt='features.png'
        />
        <div>
          <h2 className='text-3xl font-semibold mb-4'>Benefits</h2>
          <ul className='text-lg list-disc list-inside'>
            {benefits.map((benefit, index) => (
              <li key={index} className='mb-2'>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='flex justify-between items-center '>
        <div>
          <h2 className='text-3xl font-semibold mb-4'>Corporate Solution</h2>
          <ul className='text-lg list-disc list-inside'>
            {corporateSolution.map((solution, index) => (
              <li key={index} className='mb-2'>
                {solution}
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={solutionsImage}
          className='w-[50%] h-auto'
          alt='features.png'
        />
      </section>

      <div className='space-y-20 py-32'>
        <p className='text-center text-4xl font-semibold'>
          Redefine Your Development Processes, Achieve
          <span className='text-green-500'> Success</span>
        </p>
        <Pricing />
      </div>
    </div>
  )
}

export default Home
