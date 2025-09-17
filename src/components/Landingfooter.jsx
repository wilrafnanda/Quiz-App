import React from 'react'

const Landingfooter = ({setCurrentPage,currentPage,numberOfPages}) => {
  
  const pages = numberOfPages -1
  function previous(){
    if(currentPage === 1) return;
    setCurrentPage(prev => prev - 1)
  }
  function next(){
    if(currentPage > pages) return;
    setCurrentPage(prev => prev + 1)
  }
  
  return (
    <>
       <div className='mb-[50px]'>

            <p className='font-light text-[#00866d] mb-4'>Tip: Browse categories to start</p>

            <div className='flex justify-between items-center'>

            {<button onClick={previous} className={`bg-[#00efc5] py-3 px-6 text-[#091018] font-bold rounded-[7px] ${currentPage === 1 ? 'opacity-0 cursor-not-allowed': ' '}`}>prev</button>}

            <button onClick={next} className={`bg-[#00efc5] py-3 px-6 text-[#091018] font-bold rounded-[7px] ${currentPage > pages ? 'opacity-0 ' : ''}`}>next</button> 

            </div>
        </div>
    </>
  )
}

export default Landingfooter
