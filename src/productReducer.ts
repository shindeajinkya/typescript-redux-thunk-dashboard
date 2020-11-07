import { act } from "react-dom/test-utils"
import { Dispatch } from "redux"
import { addProduct, setProducts } from "./actions"
import { base } from "./base"

export interface Product{
    id ?: string,
    getId ?: () => string,
    name: string,
    price: number,
    stock: number,
}

export interface State {
    products: Product[]
}

const initialState: State = {
    products : []
}

type Action = {
    type: string,
    payload: any
}

export function productReducer(state = initialState, action: Action) {
    switch(action.type){
        case 'ADD_PRODUCT':
            return {...state, products: [...state.products, action.payload]}
        case 'SET_PRODUCTS':
            return {...state, products: [...action.payload]}
        default:
            return state
    }
}

export const addNewProduct = (product: Product) => async (dispatch: Dispatch, getState: () => State) => {
    const res = await fetch('https://api.airtable.com/v0/appV9wLRy8e2qAH2B/Products', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer key5L0LcVZpzEqCYm',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({fields: product})
    })
    .then(res => res.json())
    .catch(err => {
        console.error(err)
        return
    })
    const data = {...res.fields, id: res.id}
    dispatch(addProduct(data))
}

export const updateProduct = (product: Product) => async (dispatch: Dispatch, getState: () => State) => {
    let products = getState().products
    const updateIndex = products.findIndex(element => product.id === element.id)
    const data = {
        fields: {
            name: product.name,
            price: product.price,
            stock: product.stock
        }
    }
    await fetch(`https://api.airtable.com/v0/appV9wLRy8e2qAH2B/Products/${product.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer key5L0LcVZpzEqCYm',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        const updatedData = {...res.fields, id: res.id}
        products[updateIndex] = updatedData
        dispatch(setProducts(products))
    })
    .catch(err => {
        console.error(err)
        return
    })
}

export const deleteProduct = (product: Product) => async (dispatch: Dispatch, getState: () => State) => {
    const products = getState().products
    const deleteIndex = products.findIndex(element => product.id === element.id)
    await fetch(`https://api.airtable.com/v0/appV9wLRy8e2qAH2B/Products/${product.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer key5L0LcVZpzEqCYm',
        }
    })
    .then(res => res.json())
    .then(res => {
        products.splice(deleteIndex, 1)
        dispatch(setProducts(products))
    })
    .catch(err => {
        console.error(err)
        return
    })
}

export const loadProducts = () => async (dispatch: Dispatch, getState: () => State) => {
    let products: Product[] = []
    base('Products')
    .select({ maxRecords: 10, view: 'Grid view'})
    .eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        products.push({...record.fields, id: record.id})
      })
      fetchNextPage()
    }, (err) => {
      if(err) {
        console.error(err)
        return
      }
      dispatch(setProducts(products))
    })
}

