import { message } from "antd";
import axios from "axios";

export async function AxiosAPI({ method, url, data = null }) {
  let result = null;
  try {
    await axios({
      method: method,
      url: url,
      data: data,
    })
      .then((res) => {
        result = res.data;
      })
      .catch((err) => {
        console.log("Somthing went wrong: ", err);
        message.error("Lỗi gọi api hệ thống. Vui lòng reload lại trang web!");
      });
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
}
