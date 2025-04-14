import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { CustomCard } from "../../ui/components/CustomCard/Card";
import { registerCustomer } from "../services/usersService";
import { LoadingModal } from "../../ui/components/LoadingModal/LoadingModal";
import { ErrorModal } from "../../ui/components/ErrorModal/ErrorModal";
import { SuccessModal } from "../../ui/components/SuccesModal /SuccessModal";
import { useHttpReq } from "../../ui/hooks/useHttpReq";
import { useEffect } from "react";

type FieldType = {
  document: string;
  firstName: string;
  lastName: string;
  cellphone: string;
  email: string;
};

export const RegisterCustomerPage = () => {
  const {
    isLoading,
    openErrorModal,
    openSuccessModal,
    toggleOpenErrorModal,
    toggleOpenSuccesModal,
    error,
    data,
    mutate,
    isSuccess,
  } = useHttpReq(useMutation(registerCustomer));
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values);
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
        message={data ? data.message : "Exitoso"}
        onClose={toggleOpenSuccesModal}
      />
      <CustomCard
        title="Registrar cliente"
        icon={<UserOutlined className="text-primary" />}
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
            rules={[{ required: true, message: "Usuario es requerido." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Primer nombre"
            name="firstName"
            rules={[{ required: true, message: "Primer nombre es requerido." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Apellido"
            name="lastName"
            rules={[{ required: true, message: "Apellido es requerido." }]}
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

          <Form.Item<FieldType>
            label="Correo"
            name="email"
            rules={[{ required: true, message: "Correo es requerido." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Registar
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
    </>
  );
};
