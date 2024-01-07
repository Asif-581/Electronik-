// import React, { ChangeEvent, FC, useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../Store/hooks";
// import {
//   getCartItemAsync,
//   updateQuantity,
// } from "../features/product/CartSlice";
// import { getCurrentLoggedInUser } from "../utils/helper";

// const optionValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"];

// const AmountButton = ({ cartId, product_id }) => {
//   const dispatch = useAppDispatch();
//   const { cart } = useAppSelector((store) => store.cart);
//   const user = getCurrentLoggedInUser();
//   const [selectedQuantity, setSelectedQuantity] = useState(
//     cart.find((c) => c.id === cartId)?.quantity
//   );

//   const handleQuantityChange = async (
//     e: ChangeEvent<HTMLSelectElement> | undefined
//   ) => {
//     const quantity = parseInt(e?.target.value!);
//     setSelectedQuantity(quantity);
//     await dispatch(updateQuantity({ cartId, product_id, quantity }));
//     dispatch(getCartItemAsync(user.id));
//   };

//   return (
//     <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//       <label htmlFor="quantity">Qty : </label>
//       <select
//         id="quantity"
//         onChange={handleQuantityChange}
//         value={selectedQuantity}
//         style={{ width: "70px", cursor: "pointer" }}
//       >
//         {optionValue.map((value) => {
//           return (
//             <option key={value} value={value}>
//               {value}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// };

// export default AmountButton;

import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  getCartItemAsync,
  updateQuantity,
} from "../features/product/CartSlice";
import { getCurrentLoggedInUser } from "../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const optionValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"];

const AmountButton = ({ cartId, product_id }) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);
  const user = getCurrentLoggedInUser();
  const initialQuantity = cart.find((c) => c.id === cartId)?.quantity;
  
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(() => {
    if (!optionValue.includes(initialQuantity!)) {
      setIsCustomInput(true)
      return initialQuantity;
    }
    return initialQuantity;
  });
  const [customQuantity, setCustomQuantity] = useState(
    initialQuantity!.toString()
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
    if (quantity > 0) {
       setSelectedQuantity(quantity);
       setIsCustomInput(false);
       await updateQuantityHandler(quantity);
    }
    else {
      toast.error("Quantity should be greater than zero", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "toast-message",
      });
    }
   
  };

  const updateQuantityHandler = async (quantity: number) => {
    await dispatch(updateQuantity({ cartId, product_id, quantity }));
    dispatch(getCartItemAsync(user.id));
  };

  useEffect(() => {
    setCustomQuantity(selectedQuantity!.toString());
  }, [selectedQuantity]);

console.log(selectedQuantity)

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
      <ToastContainer/>
    </div>
  );
};

export default AmountButton;




