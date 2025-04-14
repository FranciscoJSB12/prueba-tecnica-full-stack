import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [successMesage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const { openErrorModal, toggleOpenErrorModal } = useHandleErrorModal();
  const { openSuccessModal, toggleOpenSuccessModal } = useHandleSuccessModal();
  const [form] = Form.useForm();

  const getWalletBalance = async (reqDto: GetBalanceReqDto) => {
    setIsLoading(true);
    try {
      const resp = await getBalance(reqDto);
      setSuccessMessage(`Saldo dispoble: ${resp.data.currentBalance} $`);
      toggleOpenSuccessModal(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || "Error inesperado");
      } else {
        setError((err as any).message);
      }
      toggleOpenErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await getWalletBalance({
      cellphone: values.cellphone,
      document: values.document,
    });

    form.resetFields();
  };

  return (
    <>
      <ErrorModal
        message={error}
        open={openErrorModal}
        onClose={toggleOpenErrorModal}
      />
      <LoadingModal isLoading={isLoading} message="Cargando..." />
      <SuccessModal
        open={openSuccessModal}
        message={successMesage}
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
