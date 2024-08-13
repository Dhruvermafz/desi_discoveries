import React from "react";

const CartItem = ({ title, price, quantity }) => {
  const itemTotal = (price * quantity).toFixed(2);

  return (
    <div className="cart-item">
      <h5>{title}</h5>
      <span>
        ₹{price} x {quantity}
      </span>
      <span>Total: ₹{itemTotal}</span>
    </div>
  );
};

export default CartItem;
