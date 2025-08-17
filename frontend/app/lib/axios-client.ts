// import { EndPoint, JsonHeader } from "@/api/config";
import axios from "axios";
import { EndPoint, JsonHeader } from "./config";

const { DEFAULT_URL } = EndPoint;

export const apiCall = async (
  method: any,
  urlEndPoint: string,
  data?: any,
  headers?: any
) => {
  let header: any = headers || JsonHeader;
  // header.Authorization = `Bearer ${token}`;
  switch (method) {
    case "POST":
      return await axios
        .post(`${DEFAULT_URL}/${urlEndPoint}`, data, {
          headers: header,
        })
        .then((response: any) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    case "GET":
      return await axios
        .get(`${DEFAULT_URL}/${urlEndPoint}`, {
          headers: header,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    case "PUT":
      return await axios
        .put(`${DEFAULT_URL}/${urlEndPoint}`, data, {
          headers: header,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    case "PATCH":
      return await axios
        .patch(`${DEFAULT_URL}/${urlEndPoint}`, data, {
          headers: header,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    case "DELETE":
      return await axios
        .delete(`${DEFAULT_URL}/${urlEndPoint}`, {
          headers: header,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    default:
      break;
  }
};
