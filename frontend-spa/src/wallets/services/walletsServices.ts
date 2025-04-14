import axios from "axios";
import { envVariables } from "../../config/envVariables";
import { RechargeWalletReqDto } from "../dtos/rechargeWalletReqDto";
import { GetBalanceReqDto } from "../dtos/getBalanceReqDto";

const baseUrl = envVariables.port();

export const rechargeWallet = async (reqDto: RechargeWalletReqDto) => {
  const response = await axios.patch(`${baseUrl}/billeteras/recarga`, reqDto);
  return response.data;
};

export const getBalance = async (reqDto: GetBalanceReqDto) => {
  const response = await axios.get(
    `${baseUrl}/billeteras/saldo?document=${reqDto.document}&cellphone=${reqDto.cellphone}`
  );
  return response.data;
};
