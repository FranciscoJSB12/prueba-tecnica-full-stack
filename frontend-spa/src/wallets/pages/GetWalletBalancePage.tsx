import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Button, Form, Input } from "antd";
import { AxiosError } from "axios";
import type { FormProps } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { CustomCard } from "../../ui/components/CustomCard/Card";
import { getBalance } from "../services/walletsServices";
import { GetBalanceReqDto } from "../dtos/getBalanceReqDto";
import { useHandleErrorModal } from "../../ui/hooks/useHandleErrorModal";
import { useHandleSuccessModal } from "../../ui/hooks/useHandleSuccesModal";
import { ErrorModal } from "../../ui/components/ErrorModal/ErrorModal";
import { LoadingModal } from "../../ui/components/LoadingModal/LoadingModal";
import { SuccessModal } from "../../ui/components/SuccesModal /SuccessModal";

type FieldType = {
  document: string;
  cellphone: string;
};

export const GetWalletBalancePage = () => {
  const queryClient = useQueryClient();
  const { openErrorModal, toggleOpenErrorModal } = useHandleErrorModal();
  const { openSuccessModal, toggleOpenSuccessModal } = useHandleSuccessModal();
  const [form] = Form.useForm();

  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery(
    ["walletBalanceData"],
    () => getBalance(form.getFieldsValue() as GetBalanceReqDto),
    {
      enabled: false, // Disabilitar fecth automatico
      retry: false, // Habilitar politica de reintento
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    refetch();
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["walletBalanceData"]);
    };
  }, [queryClient]);

  useEffect(() => {
    if (!isLoading && isError) {
      toggleOpenErrorModal(true);
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (isSuccess) {
      toggleOpenSuccessModal(true);
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
          data ? `Saldo dispoble: ${data.data.currentBalance} $` : "Exitoso"
        }
        onClose={toggleOpenSuccessModal}
      />
      <CustomCard
        title="Consultar saldo"
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
              Consultar
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
    </>
  );
};
