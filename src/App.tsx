import React, { FC, useEffect, useState } from 'react';  
import { Button, Modal } from 'antd'
import ProductForm from './components/ProductForm'
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {addNewProduct, deleteProduct, loadProducts, Product, State, updateProduct} from './productReducer'
import ProductList from './components/ProductList';
import EditProductForm from './components/EditProductForm';

const defaultProduct = {
  name: '',
  id: '',
  price: 0,
  stock: 0
}

const App: FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)
  const [product, setProduct] = useState<Product>(defaultProduct)
  const [modal, contextHolder] = Modal.useModal()
  const products = useSelector((state: State) => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

  const onCreate = ({name, price, stock}: Product) => {
    dispatch(addNewProduct({name, price: Number(price), stock: Number(stock)}))
    setVisible(false)
  }

  const onEdit = (product: Product) => {
    setProduct(product)
    setEditing(true)
  }

  const onUpdate = ({name, price, stock, id}: Product) => {
    dispatch(updateProduct({name, price: Number(price), stock: Number(stock), id}))
    setProduct(defaultProduct)
    setEditing(false)
  }

  const onDelete = (product: Product) => {
    modal.confirm({
      title: 'Are you sure?',
      content: (
        <>
          This will be deleted permanently.
        </>
      ),
      onOk() {
        console.log(product)
        dispatch(deleteProduct(product))
      },
      onCancel() {
        console.log('Cancelled')
      }
    })
  }

  return (
    <div className='container'>
      <Button onClick={() => setVisible(true)} type='primary'>Add Product</Button>
      <ProductList 
        products={products}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <ProductForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />
      <EditProductForm 
        visible={editing}
        onUpdate={onUpdate}
        onCancel={() => {
          setProduct(defaultProduct)
          setEditing(false)
        }}
        product={product}
      />
      {contextHolder}
    </div>
  );
}

export default App;
