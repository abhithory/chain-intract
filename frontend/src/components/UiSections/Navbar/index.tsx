"use client"
import React from 'react'
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation';


function Navbar() {
  const router = useRouter();
  const pathname = usePathname();


  return (
    <nav className="w-full flex justify-between  py-4 h-[12vh] xl:px-20 md:px-14 px-8 bg-purple-600 text-white">
      <span onClick={() => router.push("/")} className=" cursor-pointer flex items-center justify-center gap-4 xl:ml-8 md:ml-4 ml-2">
        <img
          src="/images/logo/white_logo.png"
          className='xl:w-32 md:w-16 w-14'
          alt="Picture of the author"
        />
        {/* <h1 className="text-2xl text-text-color ">Data Vault</h1> */}
      </span>
      <span className="flex items-center justify-center gap-4">
        {/* <h1 className="basic_btn_4" onClick={()=>router.push("/profile")}>
          <FaLandmark  className=''/>
          Learn More
          </h1>

          <h1 className="basic_btn_4" onClick={()=>router.push("/marketplace")}>
          <FaLandmark  className=''/>
          Marketplace
          </h1> */}
        <a href="#features-section" className="btn_primary_2">Learn More</a>
        <button className="btn_primary_2" onClick={() => {
          router.push("/")
        }}>Launch dApp</button>

      </span>
    </nav>
  )
}

export default Navbar