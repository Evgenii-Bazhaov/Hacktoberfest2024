import React, { useContext } from 'react'
import { productContext } from '../utils/context'
import { Link } from 'react-router-dom'

function Navbar() {
  const [product] = useContext(productContext)
  let distinctCatagory = product && product.reduce((acc, currVal) => [...acc, currVal.category], [])
  distinctCatagory = [... new Set(distinctCatagory)]
  // console.log(distinctCatagory)
  const colorGenerator = ()=>{
    return `rgba(${(Math.random()*255).toFixed()}, ${(Math.random()*255).toFixed()}, ${(Math.random()*255).toFixed()}, 0.6)`
  }

  return (
    <nav className='w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5'>
      <a
        className='py-3 px-5 border border-blue-300 rounded text-blue-300 font-semibold'
        href="/create"> Add Item</a>
      <hr className='my-3 w-[80%]' />
      <h1 className='text-2xl w-[80%] mb-3'>catagory</h1>
      <div className='w-[80%]'>
        {distinctCatagory.map((item, index) => (
          <Link to={`/?category=${item}`} key={index} className='mb-3 flex items-center text-md font-semibold'>
            <span style={{backgroundColor: colorGenerator()}} className='block mr-2 w-[10px] h-[10px] rounded-full bg-red-300'></span> {item}
          </Link>
        ))}



      </div>
    </nav>
  )
}

export default Navbar