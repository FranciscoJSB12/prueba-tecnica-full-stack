import { Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { CustomCard } from "../../ui/components/CustomCard/Card";
import { useEffect, useState } from "react";
import { getSessionId } from "../helpers/getSessionId";
import { useNavigate } from "react-router-dom";
import { useMutationReq } from "../../ui/hooks/useMutationReq";
import { useMutation } from "react-query";
import { confirmPaymentOrder } from "../services/paymentsServices";
import { ErrorModal } from "../../ui/components/ErrorModal/ErrorModal";
import { LoadingModal } from "../../ui/components/LoadingModal/LoadingModal";
import { SuccessModal } from "../../ui/components/SuccesModal /SuccessModal";
import { AxiosError } from "axios";
import { ConfirmPaymentOrderReqDto } from "../dtos/confirmPaymentOrderReqDto";
import { localStorageKeys } from "../constants/localStorageKeys";

type FieldType = {
  confirmationToken: string;
};

export const ConfirmPaymentPage = () => {
  const navigate = useNavigate();
  const [sessionId] = useState(getSessionId);
  const [form] = Form.useForm();
  const {
    isLoading,
    openErrorModal,
    openSuccessModal,
    toggleOpenSuccessModal,
    toggleOpenErrorModal,
    error,
    data,
    mutate,
  } = useMutationReq(useMutation(confirmPaymentOrder));

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data: ConfirmPaymentOrderReqDto = {
      sessionId: sessionId,
      confirmationToken: values.confirmationToken,
    };
    mutate(data);
  };

  const onClosePaymentSession = (open: boolean) => {
    toggleOpenSuccessModal(open);
    localStorage.removeItem(localStorageKeys.SESSION_ID);
    navigate("/");
  };

  useEffect(() => {
    if (!sessionId) navigate("/");
  }, [sessionId]);

  return (
    <>
      <ErrorModal
        message={
          error instanceof AxiosError
            ? error.response?.data.message
            : "Error inesperado"
        }
        open={openErrorModal}
        onClose={toggleOpenErrorModal}
      />
      <LoadingModal isLoading={isLoading} message="Cargando..." />
      <SuccessModal
        open={openSuccessModal}
        message={data ? `${data.message}` : "Exitoso"}
        onClose={onClosePaymentSession}
      />
      <CustomCard
        title="Ingresa el token enviado a tu correo"
        icon={<CreditCardOutlined className="text-primary" />}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Token 6 dígitos"
            name="confirmationToken"
            rules={[
              {
                required: true,
                message: "Token es requerido.",
              },
            ]}
          >
            <Input type="number" min={1} step="1" />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
    </>
  );
};
