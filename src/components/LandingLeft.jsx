import React from 'react'

const LandingLeft = () => {
  return (
    <div  className='hidden lg:grid place-content-center lg:w-[50%] bg-[color:var(--glass)]'>
        <div className='text-center'>
          <div className='flex item-center gap-3 justify-center '>
            <div className="w-3 h-3 rounded-full bg-[color:var(--accent)] mt-2"></div>
            <img className='w-[30px]' src="/icons/newsstand_24dp_C8E2E9_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
            <h1 className='text-2xl font-bold '>Midnight Quiz</h1>
          </div>
          <p className='text-[5rem] font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] bg-clip-text text-transparent'>Choose Your Category</p>
          <small>Quick, focused quizzes with a clean, modern look.</small>
        </div>
    </div>
  )
}

export default LandingLeft
