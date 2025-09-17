// import React, { useState } from 'react'
import Category from '../src/components/Category'
import Landingheader from '../src/components/Landingheader'
import Landingfooter from '../src/components/Landingfooter'
import PaginationList from '../src/components/PaginationList'
import data from '../topics.js'
import DifficultyModal from '../src/components/DifficultyModal.jsx'
import { useState } from 'react'
import LandingLeft from '../src/components/LandingLeft.jsx'



function LandingPage({currentPage,setCurrentPage}) {
 const itemsPerPage = 6

 const [modalshow, setModalShow] = useState(false)


    
    
    //calculating the number of pages 
    const numberOfPages = Math.ceil(data.length / itemsPerPage );
  return (
    <>
    {/* container to caintain the entire page */}
      <div className='lg:flex gap-4 px-5 pb-3 lg:pb-0 border-0 lg:h-screen'>
        <LandingLeft/>
        {/* topics container */}
        <section className='lg:w-[50%]'>
           {/* Header */}
           <Landingheader/>
          
            {/* main topic container */}
            <div className=' border-b-3 border-[#142c31] flex-1 pb-8 mb-6  mt-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-3 md:grid-cols-2 md:gap-3 lg:px-5'>
              <PaginationList currentPage ={currentPage} itemsPerPage = {itemsPerPage} setModalShow = {setModalShow}/>
            </div>
            {/* Footer */}
            <Landingfooter currentPage ={currentPage} setCurrentPage ={setCurrentPage} numberOfPages = {numberOfPages}/>
            {modalshow && <DifficultyModal setModalShow ={setModalShow} />}
        </section>
      </div>
    </>
  )
}

export default LandingPage
