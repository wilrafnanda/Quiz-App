import React from 'react'

const DifficultyModal = ({setModalShow}) => {
  return (
    //background overlay
    <div onClick={()=> setModalShow(false)}  class="fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center z-50">
        <div class="bg-[#1d2834] rounded-lg shadow-xl p-6 py-20 w-[90%] max-w-md text-center">
            <h1 className='text-[2rem] font-bold mb-3 bg-gradient-to-r from-[#054236] to-[#90e9d8] bg-clip-text text-transparent'>CHOOSE YOUR LEVEL</h1>
            <div className='flex flex-col justify-center items-center gap-3'>
                <button className='bg-green-700 font-bold text-[1.5rem] px-20 rounded-2xl cursor-pointer'>
                    Easy
                </button >
                <button  className='bg-yellow-400 text-black font-bold text-[1.5rem] px-16 rounded-2xl cursor-pointer'>
                    Medium
                </button>
                <button  className='bg-red-800 font-bold text-[1.5rem] px-20 rounded-2xl cursor-pointer'>
                    Hard
                </button>
            </div>
        </div>
    </div>
  )
}

export default DifficultyModal
