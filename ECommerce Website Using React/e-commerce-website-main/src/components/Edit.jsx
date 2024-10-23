import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { productContext } from '../utils/context';



function Edit() {
      const [products, setProducts] = useContext(productContext)
      const navigate = useNavigate();
      const { id } = useParams();
      const [product, setProduct] = useState({
            title: "",
            description: "",
            price: "",
            category: "",
            image: "",
      });

      const changeHandler = (e) => {
            setProduct({ ...product, [e.target.name]: e.target.value })
      }



      useEffect(() => {
            setProduct(products.filter((p) => p.id == id)[0])
      }, [id])


      const addProducthandler = (e) => {
            e.preventDefault();

            if (product.title.trim().length < 4 ||
                  product.image.trim().length < 5 ||
                  product.price.trim().length < 1 ||
                  product.category.trim().length < 2 ||
                  product.description.trim().length < 5) {
                  alert("Please fill all the fields")
                  return;
            }

            const pi = products.findIndex((p) => p.id == id);
            const copyData = [...products];
            copyData[pi] = { ...products[pi], ...product }

            setProducts(copyData);
            localStorage.setItem("products", JSON.stringify(copyData))
            navigate(-1)
            // console.log(product)
      }


      return (
            <form onSubmit={addProducthandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
                  <h1 className='mb-5 w-1/2 text-3xl font-semibold'>Edit Product</h1>

                  <input type="url"
                        placeholder='image link'
                        className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                        onChange={changeHandler}
                        name='image'
                        value={product.image} />

                  <input type="text"
                        placeholder='title'
                        className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                        onChange={changeHandler}
                        name='title'
                        value={product.title} />

                  <div className='w-1/2 flex justify-between'>
                        <input type="text"
                              placeholder='category'
                              className='text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
                              onChange={changeHandler}
                              name='category'
                              value={product.category} />

                        <input type="number"
                              placeholder='price'
                              className='text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
                              onChange={changeHandler}
                              name='price'
                              value={product.price} />
                  </div>
                  <textarea
                        className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                        rows="10"
                        placeholder='enter product description here'
                        onChange={changeHandler}
                        name='description'
                        value={product.description}
                  ></textarea>
                  <div className='w-1/2'>
                        <button
                              className='py-3 px-5 border border-blue-300 rounded text-blue-300 font-semibold'
                              href="/create"> Add New Product</button>
                  </div>
            </form>
      )
}

export default Edit