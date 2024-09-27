import React from 'react'

export default function App() {
  return (
    <>
      <div className='md:grid grid-cols-3 lg:grid-cols-4 max-w-[1200px] mx-auto border border-red-500'>
        <div className='border border-black p-4 text-4xl'>1</div>
        <div className='border border-black p-4 text-4xl'>2</div>
        <div className='border lg:col-span-2 border-black p-4 text-4xl'>3</div>
      </div>
      <div className='p-2'>
        <Box />
        <Box />
        <Box />
      </div>
    </>
  )
}

// <>
//   <div className='max-w-[1200px] mx-auto border border-red-500 p-5'>
//     <input placeholder='Yahan type karen....' type="text"
//       className='border-blue-400 duration-[400ms] my-3 w-1/3 border p-3 focus:outline-none focus:w-full' />
//   </div>
//   <div className='group mt-[40px] relative w-[400px] text-center mx-auto rounded-[5px] text-[100px] duration-300 bg-[#f1c40f]'>
//     Hello
//     <span className='group-hover:bg-gray-200 duration-[inherit] p-5 rounded-full bg-gray-600 absolute top-[-20px] right-[-10px]'></span>
//   </div>
// </>

const Box = () => {
  return (
    <div className='group mt-[40px] relative max-w-[400px] text-center mx-auto rounded-[5px] text-[50px] md:text-[100px] duration-300 bg-[#f1c40f]'>
      Hello
      <span className='group-hover:bg-gray-200 duration-[inherit] p-5 rounded-full bg-gray-600 absolute top-[-20px] right-[-10px]'></span>
    </div>
  )
}