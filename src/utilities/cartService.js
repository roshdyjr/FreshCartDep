import axios from "axios";
import { Bounce, toast } from "react-toastify";

export async function addProductToCart(productId, isDarkMode) {
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId: productId,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  toast.success("Product added successfully", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: isDarkMode ? "dark" : "light",
    transition: Bounce,
  });
  return data.numOfCartItems;
}


export async function fetchCartItemCount(token){
  return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: token,
      },
    }).then(data => data.data.numOfCartItems).catch(()=> null)
}


