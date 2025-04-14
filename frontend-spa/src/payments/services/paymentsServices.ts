import axios from "axios";
import { envVariables } from "../../config/envVariables";
import { CreatePaymentOrderReqDto } from "../dtos/createPaymentOrderReqDto";
import { ConfirmPaymentOrderReqDto } from "../dtos/confirmPaymentOrderReqDto";

const baseUrl = envVariables.port();

export const createNewPaymentOrder = async (
  reqDto: CreatePaymentOrderReqDto
) => {
  const response = await axios.post(`${baseUrl}/pagos/nueva-compra`, reqDto);
  return response.data;
};

export const confirmPaymentOrder = async (
  reqDto: ConfirmPaymentOrderReqDto
) => {
  const response = await axios.patch(
    `${baseUrl}/pagos/${reqDto.sessionId}/confirmar`,
    {
      confirmationToken: reqDto.confirmationToken,
    }
  );
  return response.data;
};
