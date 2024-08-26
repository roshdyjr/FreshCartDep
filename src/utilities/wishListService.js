import axios from "axios";
import { Bounce, toast } from "react-toastify";

export async function addProductToWishList(productId, isDarkMode) {
  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      productId: productId,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );

  toast.success("Product added to WishList", {
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
}

export async function getWishList() {
  let { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  return data.data;
}

export async function removeWishListItem(productId, isDarkMode) {
  await axios.delete(
    "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );

  toast.success("Product Removed from WishList", {
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
}
