// import React, { useState } from 'react'
import Category from '../src/components/Category'
import Landingheader from '../src/components/Landingheader'
import Landingfooter from '../src/components/Landingfooter'
import PaginationList from '../src/components/PaginationList.jsx'
import data from '../topics.js'
import DifficultyModal from '../src/components/DifficultyModal.jsx'
import { useState } from 'react'
import LandingLeft from '../src/components/LandingLeft.jsx'



function LandingPage({currentPage,setCurrentPage,Category,setCategory,setDifficulty,difficulty,setView, mode, setMode}) {
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

           {/* Mode selector */}
           <div className='flex flex-wrap gap-2 mt-2 lg:px-5'>
             {[
               {key:'classic', label:'Classic'},
               {key:'sprint', label:'Timed Sprint'},
               {key:'daily', label:'Daily Challenge'},
               {key:'endless', label:'Endless (3 lives)'}
             ].map(opt => (
               <button
                 key={opt.key}
                 onClick={() => setMode && setMode(opt.key)}
                 className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 ${
                   mode === opt.key
                     ? 'bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-[#111424] border-transparent'
                     : 'bg-[color:var(--panel)] text-[color:var(--muted)] border-[color:var(--glass-border)] hover:border-[color:var(--accent)]'
                 }`}
               >
                 {opt.label}
               </button>
             ))}
           </div>
          
            {/* main topic container */}
            <div className=' border-b-3 gap-3 border-[#142c31] flex-1 pb-8 mb-6  mt-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-3 md:grid-cols-2 md:gap-5 lg:px-5'>
              <PaginationList currentPage ={currentPage}
                              itemsPerPage = {itemsPerPage}
                              setModalShow = {setModalShow}
                              Category={Category}
                              setCategory={setCategory}
                              />
                              
                              
            </div>
            {/* Footer */}
            <Landingfooter currentPage ={currentPage} setCurrentPage ={setCurrentPage} numberOfPages = {numberOfPages}/>
            {modalshow && <DifficultyModal setModalShow ={setModalShow}
                                            difficulty={difficulty}
                                            setDifficulty={setDifficulty}
                                            setView={setView} 
                                           />}
        </section>
      </div>
    </>
  )
}

export default LandingPage
