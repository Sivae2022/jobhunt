import React from 'react'

const Jobcard = ({title,id,description,salary,location,company}) => {
  return (
    <div key={id} className='max-w-[400px] flex flex-col cursor-pointer gap-2 rounded-md  border shadow-md hover:scale-110 transition-all ease-in-out duration-300 p-7 '>
    <div className="">
        <p className='text-2xl font-[700] '>{company}</p>
        <p className='text-gray-500'>{location}</p>
    </div>
    <div className='flex flex-col gap-2 flex-grow min-h-[200px]'>
         <p className='text-2xl font-[700]'>{title}</p>
         <p className='text-base  text-gray-500'>{description}
        </p>
    </div>
    <div className='mt-3'>
    <span className='px-5 py-2 bg-gray-500 rounded-full text-white'>${salary}</span>
    </div> 
 </div>
  )
}

export default Jobcard
