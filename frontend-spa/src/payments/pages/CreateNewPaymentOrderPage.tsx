import { useEffect } from "react";
import { AxiosError } from "axios";
import { Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { CustomCard } from "../../ui/components/CustomCard/Card";
import { useMutationReq } from "../../ui/hooks/useMutationReq";
import { useMutation } from "react-query";
import { createNewPaymentOrder } from "../services/paymentsServices";
import { ErrorModal } from "../../ui/components/ErrorModal/ErrorModal";
import { LoadingModal } from "../../ui/components/LoadingModal/LoadingModal";
import { CreatePaymentOrderReqDto } from "../dtos/createPaymentOrderReqDto";
import { useNavigate } from "react-router-dom";
import { localStorageKeys } from "../constants/localStorageKeys";

type FieldType = {
  amount: string;
  document: string;
};

export const CreateNewPaymentOrderPage = () => {
  const [form] = Form.useForm();
  const {
    isLoading,
    openErrorModal,
    toggleOpenErrorModal,
    error,
    data,
    mutate,
    isSuccess,
  } = useMutationReq(useMutation(createNewPaymentOrder));
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data: CreatePaymentOrderReqDto = {
      amount: +values.amount,
      document: values.document,
    };
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate("/pagos/confirmar");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      localStorage.setItem(localStorageKeys.SESSION_ID, data.data.sessionId);
    }
  }, [data]);

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
      <CustomCard
        title="Comprar"
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
            label="Cantidad a pagar"
            name="amount"
            rules={[
              {
                required: true,
                message: "Cantidad a pagar es requerida.",
              },
            ]}
          >
            <Input type="number" min={1} step="0.01" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Documento"
            name="document"
            rules={[{ required: true, message: "Documento es requerido." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Solicitar pago
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
    </>
  );
};
