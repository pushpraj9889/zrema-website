import { post } from "../../Services/apicallMethode";

export const addTocartAction = (item) => {
  console.log("addTocartAction", item);
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const deleteAction = (item) => {
  console.log("deleteAction", item);
  return {
    type: "DELETE_FROM_CART",
    payload: item,
  };
};

export const incrementQuantity = (productId) => {
  console.log("incrementQuantity", productId);
  return {
    type: "INCREMENT_QUANTITY",
    payload: productId,
  };
};

export const decreaseQuantity = (productId) => {
  console.log("decreaseQuantity", productId);
  return {
    type: "DECREASE_QUANTITY",
    payload: productId,
  };
};

// export const UserDetailsAction = (userDetails) => {
//   console.log("usedetailsvalue", userDetails);
//   return async (dispatch, getState) => {
//     try {
//       const response = await post("user/register", userDetails);
//       console.log("responseview", response);
//       if (response) {
//         dispatch({ type: "USER_DETAILS", payload: response });
//       }
//     } catch (error) {
//       console.log("kfdjsdfkljkfds", error);
//     }
//   };
// };

export const UserDetailsAction = (userDetails, skipApi = false) => {
  return async (dispatch, getState) => {
    try {
      if (skipApi) {
        // Directly dispatch without API call
        dispatch({ type: "USER_DETAILS", payload: userDetails });
        // return;
      }

      // Otherwise, proceed with the API call
      const response = await post("user/register", userDetails);
      if (response) {
        dispatch({ type: "USER_DETAILS", payload: response });
      }
    } catch (error) {
      console.log("Error in UserDetailsAction:", error);
    }
  };
};
