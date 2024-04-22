import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  getCartItemAsync,
  updateQuantity,
} from "../features/product/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const optionValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"];

const AmountButton = ({ cartId, product_id }) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);
  const { user } = useAppSelector((store) => store.auth);
  const initialQuantity = cart.find((c) => c.cart_id === cartId)?.quantity;
  const productStock = cart.find((c) => c.cart_id === cartId)?.products.stock;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(() => {
    if (!optionValue.includes(initialQuantity!)) {
      setIsCustomInput(true);
      return initialQuantity;
    }
    return initialQuantity;
  });
  const [customQuantity, setCustomQuantity] = useState(
    initialQuantity!?.toString()
  );

  const handleQuantityChange = async (
    e: ChangeEvent<HTMLSelectElement> | undefined
  ) => {
    const selectedValue = e?.target.value;
    if (selectedValue === "10+") {
      setIsCustomInput(true);
    } else {
      const quantity = parseInt(selectedValue!);

      setSelectedQuantity(quantity);
      setCustomQuantity(quantity.toString());

      await updateQuantityHandler(quantity);
    }
  };

  const handleCustomInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomQuantity(e.target.value);
  };

  const handleUpdate = async () => {
    const quantity = parseInt(customQuantity);

    if (quantity > productStock) {
      setSelectedQuantity((initialQuantity) => initialQuantity);
      setIsCustomInput(false);
      toast.error(`Only ${productStock} left in stock!`, {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "toast-message",
      });
      return;
    }

    if (quantity > 0) {
      setSelectedQuantity(quantity);
      setIsCustomInput(false);
      await updateQuantityHandler(quantity);
    } else {
      toast.error("Quantity should be greater than zero", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "toast-message",
      });
    }
  };

  const updateQuantityHandler = async (quantity: number) => {
    await dispatch(updateQuantity({ cartId, product_id, quantity }));
    dispatch(getCartItemAsync(user?.user_id!));
  };

  useEffect(() => {
    setCustomQuantity(selectedQuantity!?.toString());
  }, [selectedQuantity]);

  console.log(cart, initialQuantity, productStock);

  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <label htmlFor="quantity">Qty : </label>
      {isCustomInput ? (
        <>
          <input
            type="number"
            value={customQuantity}
            onChange={handleCustomInputChange}
            style={{ width: "70px", marginRight: "5px" }}
          />
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <select
          id="quantity"
          onChange={handleQuantityChange}
          value={selectedQuantity}
          style={{ width: "70px", cursor: "pointer" }}
        >
          {optionValue.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      )}
      <ToastContainer />
    </div>
  );
};

export default AmountButton;
