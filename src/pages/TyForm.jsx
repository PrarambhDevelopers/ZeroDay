import React from 'react'

export default function TyForm({type, status }) {
  return (
    <div className='flex justify-center items-center min-h-screen py-10'> 
      {status === "not_started" ? (
        <div className='flex justify-center items-center space-y-5 flex-col text-3xl font-bold text-center text-[#50ff53]'>
            <h2 className=" "> Hold your horses, hackers!   </h2>
            <h2>Registration opens at 7 PM today.</h2>
            <h2>Stay tuned, or risk getting 403 - Forbidden!</h2>
       </div>
      ) : status === "open" ? (
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdTiZCA4jIS1uEMRi4BKfjS8Kc0KAx5jUkPv1QNM6CRc-MFCA/viewform?embedded=true" width="640" height="3550" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      ) : (
        <h2 className="text-3xl font-bold text-center text-[#50ff53]">
          Registration is closed
        </h2>
      )}
    </div>
  )
}
