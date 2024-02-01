import axios from "../api/axios";
import { useDispatch } from "react-redux";
import {setToken} from "../storeAndSlices/authSlice"

const useRefreshToken = () => {
const dispatch = useDispatch();
  const refresh = async () => {
    const config = {
      withCredentials: true,
    };
    const response = await axios.get("/api/v1/users/refresh", config);
    const accessToken = response?.data?.data;
    dispatch(setToken({accessToken}));
    return response?.data?.data;
  };
  return refresh;
};

export default useRefreshToken;
