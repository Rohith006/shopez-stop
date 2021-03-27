import axios from 'axios'
// const url = "http://localhost:9000/api"

export const addToWishlist = async (productId, authtoken) => 
    await axios.post(`${process.env.REACT_APP_API}/user/wishlist`, 
    { productId },
    {
        headers: {
            authtoken
        },
    }
)

export const getToWishlist = async ( authtoken) => 
    await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, 
    {
        headers: {
            authtoken
        },
    })

export const updateWishlist = async (productId, authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/user/wishlist/${productId}`, {},
    {
        headers: {
            authtoken
        },
    })

    // cart
export const userCart = async (cart, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
        headers: {
            authtoken,
        },
        }
    );
    
export const getUserCart = async ( authtoken ) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`,
        {
        headers: {
            authtoken,
        },
        }
    );

export const emptyCart = async ( authtoken ) =>
    await axios.delete(`${process.env.REACT_APP_API}/user/cart`, 
        {
        headers: {
            authtoken,
        },
        }
    );

export const userAddress = async ( authtoken, address ) =>
    await axios.post(`${process.env.REACT_APP_API}/user/address`, {address}, 
        {
        headers: {
            authtoken,
        },
        }
    )

export const applyCoupon = async (authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart/coupon`,
        { coupon },
        {
            headers: {
            authtoken,
            },
        }
    );

export const createOrder = async (stripeResponse, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        { stripeResponse },
        {
            headers: {
                authtoken,
            },
        }
    );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });