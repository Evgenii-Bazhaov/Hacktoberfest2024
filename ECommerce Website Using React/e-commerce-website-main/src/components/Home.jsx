import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useLocation } from 'react-router-dom'
import { productContext } from '../utils/context.jsx'
import axios from '../utils/axios'

function Home() {
      
      // let filteredProducts = product && product;
      const [product] = useContext(productContext)
      const [filteredProducts, setfilteredProducts] = useState(null)
      // console.log(product)
      const {search} = useLocation();
      const category = decodeURIComponent(search.split("=")[1])
      // console.log(category)
      const getProductCategory = async ()=>{
            try {
                  const {data} = await axios.get(`/products/category/${category}`)
                  setfilteredProducts(data)
            } catch (error) {
                  
            }
      }

      useEffect(()=>{
            if(!filteredProducts || category == "undefined") setfilteredProducts(product)
            if (category != "undefined") {
                  // getProductCategory()
                  setfilteredProducts(product.filter((p)=> p.category == category))

            }

                  
      }, [category, product])

      return (
            <>
                  <Navbar />
                  <div className='h-full w-[85%]  p-10 pt-[6%] flex flex-wrap overflow-x-hidden overflow-y-auto'>
                        {filteredProducts && filteredProducts.map((item, index)=>(
                             
                                    <div className='card w-[18%] h-[40vh] p-5 border shadow rounded flex flex-col justify-center items-center mr-3 mb-3'>
                                    <div
                                          className='w-full h-[25vh] bg-contain bg-no-repeat mb-3 bg-center '
                                          style={{ backgroundImage: `url(${item.image})` }
                                          }>
                                    </div>
                                    <h1>{item.title}</h1>
                                    <Link to={`/details/${item.id}`} className='py-1 px-3 bg-red-200 font-semibold m-1 text-sm'>Details</Link>
                              </div>
                              
                        ))}
                  </div>
            </>

      )
}

export default Home