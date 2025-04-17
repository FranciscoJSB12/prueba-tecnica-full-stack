import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { WalletOutlined } from "@ant-design/icons";
import { CustomCard } from "../../ui/components/CustomCard/Card";
import { useMutationReq } from "../../ui/hooks/useMutationReq";
import { rechargeWallet } from "../services/walletsServices";
import { ErrorModal } from "../../ui/components/ErrorModal/ErrorModal";
import { LoadingModal } from "../../ui/components/LoadingModal/LoadingModal";
import { SuccessModal } from "../../ui/components/SuccesModal/SuccessModal";
import { RechargeWalletReqDto } from "../dtos/rechargeWalletReqDto";

type FieldType = {
  amount: string;
  document: string;
  cellphone: string;
};

export const RechargeWalletPage = () => {
  const [form] = Form.useForm();
  const {
    isLoading,
    openErrorModal,
    openSuccessModal,
    toggleOpenErrorModal,
    toggleOpenSuccessModal,
    error,
    data,
    mutate,
    isSuccess,
  } = useMutationReq(useMutation(rechargeWallet));

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data: RechargeWalletReqDto = {
      amount: +values.amount,
      document: values.document,
      cellphone: values.cellphone,
    };
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

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
        message={
          data
            ? `Recarga exitosa. Nuevo balance: ${data.data.newBalance} $`
            : "Exitoso"
        }
        onClose={toggleOpenSuccessModal}
      />
      <CustomCard
        title="Recargar billetera"
        icon={<WalletOutlined className="text-primary" />}
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
            label="Cantidad a recargar"
            name="amount"
            rules={[
              {
                required: true,
                message: "Cantidad a recarga es requerida.",
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

          <Form.Item<FieldType>
            label="Celular"
            name="cellphone"
            rules={[{ required: true, message: "Celular es requerido." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Recargar
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
    </>
  );
};
