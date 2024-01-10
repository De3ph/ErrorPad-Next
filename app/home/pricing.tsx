import { IconArrowDown } from "@tabler/icons-react"
import React from "react"

const Pricing = () => {
  const plans = [
    {
      type: "Weekly",
      features: [
        "Unlimited access to all features",
        "24/7 customer support",
        "Automatic updates"
      ],
      price: 9.99
    },
    {
      type: "Monthly",
      features: [
        "Unlimited access to all features",
        "24/7 customer support",
        "Automatic updates",
        "Priority support"
      ],
      price: 29.99
    },
    {
      type: "Yearly",
      features: [
        "Unlimited access to all features",
        "24/7 customer support",
        "Automatic updates",
        "Priority support",
        "Exclusive webinars"
      ],
      price: 199.99
    }
  ]

  return (
    <div className='container mx-auto space-y-16'>
      <p className='text-3xl font-semibold text-center flex items-center justify-center gap-2'>
        Choose Your Plan
        <span>
          <IconArrowDown />
        </span>
      </p>

      <div className='flex'>
        {plans.map((plan, index) => (
          <div
            key={index}
            className='p-6 border border-gray-300 rounded-md shadow-md mx-4 flex flex-col justify-between'
          >
            <div>
              <h3 className='text-xl font-semibold mb-4'>{plan.type} Plan</h3>
              <ul className='list-disc list-inside mb-4'>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className='text-2xl font-semibold mb-4'>${plan.price}/month</p>
              <a
                href='#'
                className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300'
              >
                Choose {plan.type}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
