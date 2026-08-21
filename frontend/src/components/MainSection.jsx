import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const MainSection = () => {
    const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const loadProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/item/products')
      setProducts(response.data)
    } catch {
      setError('Unable to load products.')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/item/products/${id}`)
      setProducts((currentProducts) => currentProducts.filter((product) => product._id !== id))
    } catch {
      setError('Unable to delete product.')
    }
  }

  return (
    <div className='main'>
        <Header/>
    <div className='product-toolbar'>
      <h1>Products</h1>
      <button onClick={() => navigate('/product-form')}>Add Product</button>
        </div>
    {error && <p className='error-message'>{error}</p>}
    <div className='product-list'>
      {products.length === 0 && !error && <p>No products found.</p>}
      {products.map((product) => (
        <article className='product-row' key={product._id}>
          <div>
            <h2>{product.name}</h2>
            <p>{product.category} | ${Number(product.price).toFixed(2)} | {product.inStock ? 'In stock' : 'Out of stock'}</p>
          </div>
          <div className='product-actions'>
            <button onClick={() => navigate(`/product-form/${product._id}`)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        </article>
      ))}
    </div>
    </div>
  )
}

export default MainSection