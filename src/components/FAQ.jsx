import React from 'react'

const FAQ = () => {
  return (
    <div>
        <div className="max-w-4xl mx-auto p-5 flex flex-col justify-center min-h-[100vh]">
            <h2 className="text-3xl font-bold text-center text-[#50ff53] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <details className="bg-[#121212] p-4 rounded-lg shadow-md">
                    <summary className="cursor-pointer text-lg font-semibold text-[#50ff53]">What do I need to participate?</summary>
                    <p className="text-gray-400 mt-2">You need a laptop with internet access and a curious mind.</p>
                </details>
                <details className="bg-[#121212] p-4 rounded-lg shadow-md">
                    <summary className="cursor-pointer text-lg font-semibold text-[#50ff53]">Will there be a holiday on Rangpanchami?</summary>
                    <p className="text-gray-400 mt-2">Of course! We know our geeks need a break too. Enjoy Rangpanchami on 19th March—no sessions that day! 🎉 Happy Holi! </p>
                </details>

                <details className="bg-[#121212] p-4 rounded-lg shadow-md">
                    <summary className="cursor-pointer text-lg font-semibold text-[#50ff53]">Is prior experience required?</summary>
                    <p className="text-gray-400 mt-2">No prior experience is required. All skill levels are welcome.</p>
                </details>
                <details className="bg-[#121212] p-4 rounded-lg shadow-md">
                    <summary className="cursor-pointer text-lg font-semibold text-[#50ff53]">Is this legal and ethical?</summary>
                    <p className="text-gray-400 mt-2">Yes, all challenges are designed to be legal and ethical.</p>
                </details>
                <details className="bg-[#121212] p-4 rounded-lg shadow-md">
                    <summary className="cursor-pointer text-lg font-semibold text-[#50ff53]">Do I need to bring my laptop?</summary>
                    <p className="text-gray-400 mt-2">Yes, please bring your own laptop for the challenges.</p>
                </details>
                <details className="bg-[#121212] p-4 rounded-lg shadow-md">
                    <summary className="cursor-pointer text-lg font-semibold text-[#50ff53]">Will there be certificates?</summary>
                    <p className="text-gray-400 mt-2">Yes, participants will receive certificates upon completion.</p>
                </details>

            </div>
        </div>
    </div>
  )
}

export default FAQ