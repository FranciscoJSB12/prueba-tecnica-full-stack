import axios from "axios";
import { envVariables } from "../../config/envVariables";
import { RegisterCustomerReqDto } from "../dtos/registerCustomerReqDto";

const baseUrl = envVariables.port();

export const registerCustomer = async (reqDto: RegisterCustomerReqDto) => {
  const response = await axios.post(`${baseUrl}/registar-cliente`, reqDto);
  return response.data;
};
