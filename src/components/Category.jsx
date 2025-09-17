import React from 'react'


const Category = (props) => {

    console.log(props);
    const {setModalShow} = props
  return (
    <>
        <div className='bg-[#161923] w-[100%] mx-auto  mb-1 rounded-[20px] p-3 border-[#142c31] border-2'> 
            <div className='flex justify-between justify items-center gap-3'>
                <span className='text-2xl font-bold flex items-center gap-2 '>
                    <img src={props.data?.img} alt=""  className='w-10'/>
                    <p className='mb-[5px] text-[0.9rem] '>{props.data.category}</p>
                </span>
                <span className='py-1 px-2 bg-[#091018] rounded-[20px] text-[0.8rem] text-[#5b6872]'>
                    15Qs
                </span>
            </div>
            <p className='text-[#8e8e8e] mb-2 ml-3 text-sm font-semibold '>{props.data.description}</p>
            <div className='flex justify-end'>
                <button
                onClick={()=>setModalShow(true)}
                 className='
                    xl:text-xl
                    px-2 py-1.5
                    bg-[#00efc5] 
                    rounded-[15px] 
                    text-sm text-[#161923] 
                    font-semibold border-2
                    border-[#142c31]
                    cursor-pointer'
                >Start</button>
            </div>
        </div> 
    </>
  )
}

export default Category
