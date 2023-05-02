import axiosAPI from "../common/AxiosAPI";

const useRefreshToken = () => {
  const refresh = async () => {
    const params = {
      refreshToken: sessionStorage[`refresh_token`],
    };
    const response = await axiosAPI.post("/user/refreshToken", null, {
      params,
    });
    const data = response?.data?.data;
    // Lưu access token và refresh token vào session storage
    if (response?.data?.code === 200 && data) {
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
    }
    // Trả về access token
    return data?.access_token;
  };
  return refresh;
};

export default useRefreshToken;
