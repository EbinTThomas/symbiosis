import React from 'react';

function ShoppingCartItem({cartItem}) {
  return (
    <div className="shopping_cart_item">
        <img src="https://assets.ajio.com/medias/sys_master/root/20230915/ABsH/65045bc8afa4cf41f5e7ea49/-288Wx360H-466584516-blue-MODEL.jpg" alt="" className="sc_item_thumb" />
        <div className="sc_item_details">
            <div className="sc_item_title">{cartItem.name}</div>
            <div className="sc_item_desc">{cartItem.desc}</div>
            <div className="sc_item_quantity_selector">

            </div>
            <div className="sc_item_price">₹{cartItem.price}</div>
            <div className="sc_item_rm_btn">Remove</div>
        </div>
    </div>
  )
}

export default ShoppingCartItem