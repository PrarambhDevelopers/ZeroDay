import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-[88vh] text-center'>
        <h1 className='text-[7rem] font-bold tracking-widest text-[#50ff53]'>404 | Not Found</h1>
        <p className='mt-4 text-xl text-white'>Oops! Looks like you’ve traced the wrong IP or maybe you ran <span className="text-[#50ff53]">nmap</span> on yourself!<br /> Either way, this page is in stealth mode. 🕵️‍♂️💻</p>
    </div>

  )
}
