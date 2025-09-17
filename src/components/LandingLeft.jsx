import React from 'react'

const LandingLeft = () => {
  return (
    <div  className='hidden lg:grid place-content-center lg:w-[50%] bg-gradient-to-br from-[#111424] via-[#0a2a29] to-[111423]'>
        <div className='text-center'>
          <div className='flex item-center gap-3 justify-center '>
            <div class="w-3 h-3 rounded-full bg-[rgb(0,239,197)] shadow-[0_0_10px_3px_rgba(0,239,197,0.7)] mt-2"></div>
            <img className='w-[30px]' src="/icons/newsstand_24dp_C8E2E9_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
            <h1 className='text-2xl font-bold '>Midnight Quiz</h1>
          </div>
          <p className='text-[5rem] font-bold bg-gradient-to-r from-[#28ff5e] to-[#19fff3] bg-clip-text text-transparent'>Choose Your Category</p>
          <small>Quick, focused quizzes with a clean, modern look.</small>
        </div>
    </div>
  )
}

export default LandingLeft
