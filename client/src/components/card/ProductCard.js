/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RatingAvg } from "../../function/rating"
import { useDispatch} from "react-redux"

import _ from "lodash"

const { Meta } = Card

const ProductCard = ({ product }) => {

    const [tooltip, setTooltip] = useState("Click to add")
  
    // redux
    // const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
  
    const handleAddToCart = () => {
      // create cart array
      let cart = [];
      if (typeof window !== "undefined") {
        // if cart is in local storage GET it
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }
        // push new product to cart
        cart.push({
          ...product,
          count: 1,
        }); 
        // remove duplicates
        let unique = _.uniqWith(cart, _.isEqual);
        // save to local storage
        // console.log('unique', unique)
        localStorage.setItem("cart", JSON.stringify(unique));
        // show tooltip
        setTooltip("Added");
  
        // add to reeux state
        dispatch({
          type: "ADD_TO_CART",
          payload: unique,
        });
        
        dispatch({
          type: "CART_SIDE_VIEW",
          payload: true,
        });
      }
    };

    
  
    // destructure
    const { images, title, description, slug, price } = product;
    return (
      <>
        {product && product.ratings && product.ratings.length > 0 ? (
          RatingAvg(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
  
        <Card
          cover={
            <img
                alt={title} 
                src={images && images.length ? images[0].url : ''}
                style={{ height: "150px", objectFit: "cover" }}
                className="p-1"
            />
          }
          actions={[
            <Link to={`/product/${slug}`}>
              <EyeOutlined className="text-warning" /> <br /> View Product
            </Link>,
            <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
          ]}
        >
          <Meta
            title={`${title} - $${price}`}
            description={`${description && description.substring(0, 40)}...`}
          />
        </Card>
      </>
    );
  };
  
  export default ProductCard;
  












// const ProductCard = ({ product }) => {

//     const { title, description, images, slug, price} = product
//     const { user, cart } = useSelector((state) => ({...state}))
//     const  dispatch  = useDispatch()
//     const [tooltip, setTooltip] = useState("Click to add");
    


//     const handleCart = () => {

//         let cart = []
//         if(typeof window !== "undefined") {
//             // if there is a cart in local storage we will GET it 
//             if (localStorage.getItem("cart")){
//                 cart = JSON.parse(localStorage.getItem("cart"))
//             }
//             // push new item to cart array
//             cart.push({
//                 ...product,
//                 count:1,
//             });
//             // we are removiing duplicates with loadash 
//             let unique = _.uniqWith(cart, _.isEqual)
//             // console.log("unique------>", unique)
//             // i m saving data in local storage in json format
//             localStorage.setItem("cart", JSON.stringify(unique))
//             setTooltip("Added");

//             // ading product to cart using state
//             dispatch({
//                 type:" ADD_TO_CART",
//                 payload: unique 
//             }) 
//         }
//     }


    

//     return(
//         <>
//         {product && product.ratings && product.ratings.length > 0 ? RatingAvg(product)  : 
//             <div className="text-center pt-1 pb-3">
//                     NO RATING YET
//             </div> 
//         }
//             <Card
//                 cover={
//                     <img alt={title} 
//                     src= {images && images.length ? images[0].url : " "} 
//                     // style={{ width: 240, height: "250px", objectFit: "cover" }}
//                     // className = 'p-1'
//                     />
//                 }
//                 actions={[ 
//                     <Link to = {`/product/${slug}`}>
//                         <EyeOutlined 
//                             className="text-warning" 
//                         />
//                         <br /> View Product
//                     </Link>,
//                     <Tooltip title={tooltip}>
//                         <a onClick={handleCart}>
//                             <ShoppingCartOutlined className="text-danger" /> <br /> Add to
//                             Cart
//                         </a>
//                     </Tooltip>,

//                 ]}
//             >
//                 <Meta
//                     title={`${title} - ${price}`}
//                     description={`${description && description.substring(0, 40)}...`}
//                 />
//             </Card>
//         </>
//     )
// }
// export default ProductCard
