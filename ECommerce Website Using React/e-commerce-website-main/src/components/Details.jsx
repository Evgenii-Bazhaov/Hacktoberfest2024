import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { productContext } from '../utils/context'
import axios from '../utils/axios'

function Details() {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(productContext)
  const [product, setProduct] = useState(null)
  const {id} = useParams()
  // const getSingleProduct = async ()=>{
  //   try {
  //     const {data}= await axios.get(`/products/${id}`)
  //     setProduct(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const productDeleteHandler = (id)=>{
    // alert();
    // console.log(id)
    const filteredProduct = products.filter((p)=> p.id !== id)
    setProducts(filteredProduct)
    localStorage.setItem('products', JSON.stringify(filteredProduct))
    navigate('/')
  }

  useEffect(()=>{
    if(!product) {
      setProduct(products.filter((p)=> p.id ==id)[0])
    }
  }, [])
  return ( product ? (
    <div className='w-[80%] h-full flex justify-evenly m-auto p-[10%]'>
      <img
        className='object-contain h-[80%] w-[40%]'
        src={`${product.image}`} alt="" />
      <div className="context w-[40%] px-10">
        <h1 className='text-4xl font-bold'>{product.title}</h1>
        <h3 className='text-zinc-400 my-5'>{product.category}</h3>
        <h2 className='text-red-300 mb-3'>$ {product.price}</h2>
        <p className='font-semibold text-zinc-900 my-3'>{product.description}</p>
        <Link to={`/edit/${product.id}`} className='mr-3 py-1 px-3 text-sm bg-blue-300 rounded-full font-semibold text-white'>Edit</Link>
        <button onClick={()=>productDeleteHandler(product.id)} className='py-1  px-3 text-sm bg-red-300 rounded-full font-semibold text-white'>Delete</button>
      </div>
    </div>
  )
    : (<div>Loading</div>)
  )
}

export default Details