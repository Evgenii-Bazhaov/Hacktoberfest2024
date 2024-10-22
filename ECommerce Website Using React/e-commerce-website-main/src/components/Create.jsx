import React, { useContext, useState } from 'react'
import { productContext } from '../utils/context'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


function Create() {
      const navigate = useNavigate();
      const [products, setProducts] = useContext(productContext)
      const [title, setTitle] = useState("")
      const [image, setImage] = useState("")
      const [price, setPrice] = useState("")
      const [category, setCategory] = useState("")
      const [description, setDescription] = useState("")

      const addProducthandler = (e) => {
            e.preventDefault();

            if (title.trim().length < 4 ||
                  image.trim().length < 5 ||
                  price.trim().length < 1 ||
                  category.trim().length < 2 ||
                  description.trim().length < 5) {
                  alert("Please fill all the fields")
                  return;
            }

            const product = {
                  id: nanoid(),
                  title,
                  image,
                  price,
                  category,
                  description
            }
            setProducts([...products, product]);
            localStorage.setItem("products", JSON.stringify([...products, product]))
            toast.success("product added successfully")
            navigate("/")
            // console.log(product)
      }


      return (
            <form onSubmit={addProducthandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
                  <h1 className='mb-5 w-1/2 text-3xl font-semibold'>Add New Product</h1>

                  <input type="url"
                        placeholder='image link'
                        className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                        onChange={(e) => setImage(e.target.value)}
                        value={image} />

                  <input type="text"
                        placeholder='title'
                        className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title} />

                  <div className='w-1/2 flex justify-between'>
                        <input type="text"
                              placeholder='category'
                              className='text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
                              onChange={(e) => setCategory(e.target.value)}
                              value={category} />

                        <input type="number"
                              placeholder='price'
                              className='text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
                              onChange={(e) => setPrice(e.target.value)}
                              value={price} />
                  </div>
                  <textarea
                        className='text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                        rows="10"
                        placeholder='enter product description here'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                  ></textarea>
                  <div className='w-1/2'>
                        <button
                              className='py-3 px-5 border border-blue-300 rounded text-blue-300 font-semibold'
                              href="/create"> Add New Product</button>
                  </div>
            </form>
      )
}

export default Create