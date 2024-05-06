// import React, { useEffect, useState } from "react";

// const UseAuth = () => {
//   const [allowuser, setAllowUser] = useState(false);
//   let token = null;
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     token = localStorage.getItem("accessToken");

//     function isTokenExpired(token: string | null) {
//       if (!token) {
//         // Token is not provided
//         return true;
//       }

//       const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token payload
//       const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

//       const currentTime = Date.now(); // Current time in milliseconds

//       return currentTime > expirationTime; // Return true if token is expired, false otherwise
//     }

//     if (!isTokenExpired(token)) {
//       setAllowUser(true);
//       // Handle expired token, e.g., redirect to login page or refresh token
//     } else {
//       console.log("token is expired please login ");
//       // Proceed with making authenticated requests using the token
//     }
//   }, []);

//   return { allowuser, setAllowUser };
// };

// export default UseAuth;

import React, { useEffect, useState } from "react";

const UseAuth = () => {
  const [allowuser, setAllowUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    function isTokenExpired(token: string | null) {
      if (!token) {
        // Token is not provided
        return true;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds
      const currentTime = Date.now(); // Current time in milliseconds

      return currentTime > expirationTime; // Return true if token is expired, false otherwise
    }

    if (token && !isTokenExpired(token)) {
      setAllowUser(true);
    } else {
      console.log("token is expired or loogeed out");

      // Token is expired or not provided, handle accordingly
      // setAllowUser(false);
      // Optionally, you can redirect the user to the login page here
      // window.location.href = "/login";
    }
  }, []);

  return { allowuser, setAllowUser };
};

export default UseAuth;
