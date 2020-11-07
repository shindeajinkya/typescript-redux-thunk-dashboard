import { Product } from "./productReducer"

export const addProduct = (product: Product) => {
    return { type: 'ADD_PRODUCT', payload: product}
}

export const setProducts = (products: Product[]) => {
    return { type: 'SET_PRODUCTS', payload: products}
}