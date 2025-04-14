import axios from "axios";
import { envVariables } from "../../config/envVariables";
import { RechargeWalletReqDto } from "../dtos/rechargeWalletReqDto";

const baseUrl = envVariables.port();

export const rechargeWallet = async (reqDto: RechargeWalletReqDto) => {
  const response = await axios.patch(`${baseUrl}/billeteras/recarga`, reqDto);
  return response.data;
};
