import axios from 'axios'
// const url = "http://localhost:9000/api"

// product related routes

export const createProduct = async(product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product,{
        headers: { authtoken }
})

export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`)


export const ProductRemove = async(slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`,
    {
        headers: { 
            authtoken 
        }
})

export const getProduct = async (slug) => 
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

export const updateProduct = async(slug, product, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product,{
        headers: { authtoken }
})

export const getProducts = async ( sort, order, page) =>
    await axios.post(`${process.env.REACT_APP_API}/products`, 
    {
        sort, 
        order, 
        page
})

export const getProductsCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}/totalproducts`)

    
export const productStar = async(productId, star, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, 
    { star },
    {
        headers: { authtoken }
})


export const getRelatedProduct = async (productId) =>
    await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)

// search for products

export const getSearchProducts = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg)

