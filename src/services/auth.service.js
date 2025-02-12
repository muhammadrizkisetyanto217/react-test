import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = (data, callback) => {
    axios.post("https://fakestoreapi.com/auth/login", data)
        .then((res) => {
            // console.log(res, "dari auth service");
            callback(true, res.data.token);
        })
        .catch((err) => {
            callback(false, err);
            // console.log(err);
        });
}

export const getUserName = (token) => {
    // const decoded = jwtDecode(token);
    // console.log(decoded);
    // console.log(token, "hasil");
    // const tokenhasil = localStorage.getItem("token");
    // console.log(tokenhasil, "token");

    const decoded = jwtDecode(token);
    // console.log(decoded.user);
    return decoded.user

}