import React, { useState } from 'react';
import axios from '../../../../api/axios';
import { Link } from 'react-router-dom';

function ShoppingCartItem({ cartItem, removeCartItem, fetchCartList }) {
  const token = localStorage.getItem('token');
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isQuantityChanged, setIsQuantityChanged] = useState(false); // Track if quantity changed

  const handleIncrementQuantity = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    setIsQuantityChanged(true);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      setQuantity(updatedQuantity);
      setIsQuantityChanged(true);
    }
  };

  const setUpdatedQuantityOnServer = async () => {
    try {
      const response = await axios.put(
        `/api/cart-products/${cartItem.product.id}/`,
        {
          quantity: quantity,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );
      setIsQuantityChanged(false);
      fetchCartList();
    } catch (error) {
      console.log(error);
    }
  };
  const formatIndianRupee = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="shopping_cart_item">
      <img
        src={cartItem.product.get_image ? cartItem.product.get_image : '/assets/img/temp.jpg'}
        alt=""
        className="sc_item_thumb"
      />
      <div className="sc_item_details">
        <Link to={`/product_detail/${cartItem.product.id}`} className="sc_item_title">
          {cartItem.product.name}
        </Link>
        <div className="sc_item_desc">{cartItem.product.description}</div>
        <div className="sc_item_price">{formatIndianRupee(cartItem.product.price)}</div>
        <div className="sc_item_bottom">
          <div className="quantity_selection">
            <div className="q_selector_container">
              <button className="q_btn" id="q_dec_btn" onClick={handleDecrementQuantity}>
                -
              </button>
              <div className="q_input">{quantity}</div>
              <button className="q_btn" id="q_inc_btn" onClick={handleIncrementQuantity}>
                +
              </button>
            </div>
            {isQuantityChanged && (
              <button className="save_quantity" onClick={setUpdatedQuantityOnServer}>
                Save
              </button>
            )}
          </div>
          <button className="sc_item_rm_btn" style={{ display: isQuantityChanged && 'none' }} onClick={() => removeCartItem(cartItem.product)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z"
                fill="black"
              />
              <path
                d="M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z"
                fill="black"
              />
              <path
                d="M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.28210 19.379L7.30180 19.5563C7.37011 20.1710 7.84652 20.6612 8.45905 20.7470C10.8082 21.0758 13.1918 21.0758 15.5409 20.7470C16.1535 20.6612 16.6299 20.1710 16.6982 19.5563L16.71790 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartItem;
