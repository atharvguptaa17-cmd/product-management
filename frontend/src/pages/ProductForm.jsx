import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    inStock: true
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    axios.get(`http://localhost:3000/api/item/products/${id}`)
      .then(({ data }) => setFormData({
        name: data.name,
        price: data.price,
        category: data.category,
        inStock: data.inStock
      }))
      .catch(() => setError('Unable to load product.'))
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const request = isEditing
        ? axios.put(`http://localhost:3000/api/item/products/${id}`, formData)
        : axios.post('http://localhost:3000/api/item/products', formData)
      await request
      navigate('/admin-dashboard')
    } catch {
      setError(`Unable to ${isEditing ? 'update' : 'add'} product.`)
    }
  }

  return (
    <div className='outer'>
      <div className='login-container'>
        <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
        {error && <p className='error-message'>{error}</p>}
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-input'>
            <label>Product Name *</label>
            <input
              type='text'
              name='name'
              placeholder='Enter product name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='login-input'>
            <label>Price *</label>
            <input
              type='number'
              name='price'
              placeholder='Enter price'
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className='login-input'>
            <label>Category *</label>
            <input
              type='text'
              name='category'
              placeholder='Enter category'
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className='login-input'>
            <label>
              <input
                type='checkbox'
                name='inStock'
                checked={formData.inStock}
                onChange={handleChange}
              />
              In Stock
            </label>
          </div>
          <button className='login-btn' type='submit'>{isEditing ? 'Save Changes' : 'Add Product'}</button>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
