import React from "react";
import { Typography } from "@/ui/index";
import logo from "@/images/logo2.png";
import Image from "next/image";

function Footer() {
  return (
    <footer className='w-full min-h-fit mt-6 px-6 py-6 space-y-6 bg-white'>
      <Image src={logo} alt='logo-ct' className='w-32 mx-auto' />
      <Typography variant='h5' className='text-center font-normal'>
        &copy; 2023 Material Tailwind
      </Typography>
    </footer>
  )
}

export default Footer;
