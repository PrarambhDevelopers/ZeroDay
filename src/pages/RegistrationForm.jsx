import React from 'react'

export default function RegistrationForm({link, status }) {
  return (
    <div className='flex justify-center items-center min-h-screen py-10'> 
      {status === "not_started" ? (
        <h2 className="text-3xl font-bold text-center text-[#ff5050]">
          Registration has not started yet
        </h2>
      ) : status === "open" ? (
        <iframe 
          src={link} 
          width="640" 
          height="1600"   
          frameBorder="0" 
          marginHeight="0" 
          marginWidth="0"
        >
          Loading…
        </iframe>
      ) : (
        <h2 className="text-3xl font-bold text-center text-[#50ff53]">
          Registration is closed
        </h2>
      )}
    </div>
  )
}
