import { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } from './redux'
import { useState } from 'react'
import './App.scss'

function App() {
  const [count, setCount] = useState('')
  const [newProduct, setNewProduct] = useState('')
  const { data = [], isLoading } = useGetGoodsQuery(count)
  const [addProduct] = useAddProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  if (isLoading) return <h1>Loading</h1>

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap()
      setNewProduct('')
    }
  }

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap()
  }

  return (
    <div className="App">
      <div className="app__wrapper">
        <div>
          <input
            className="app__input"
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
          <button
            type="button"
            className="app__button"
            onClick={handleAddProduct}
          >
            Add product
          </button>
        </div>
        <div>
          <select
            className="app__select"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          >
            <option className="app__item" value="">
              all
            </option>
            <option className="app__item" value="1">
              1
            </option>
            <option className="app__item" value="2">
              2
            </option>
            <option className="app__item" value="3">
              3
            </option>
          </select>
        </div>
        <ul className="app__body">
          {data.map((item) => (
            <li
              className="app__products"
              key={item.id}
              onClick={() => handleDeleteProduct(item.id)}
            >
              {item.name}
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  )
}

export default App
