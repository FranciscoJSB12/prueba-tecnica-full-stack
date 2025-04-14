import { Modal, Spin } from "antd";

interface ModalInfoProps {
  isLoading: boolean;
  message: string;
}

export const LoadingModal = ({ isLoading, message }: ModalInfoProps) => {
  return (
    <Modal
      open={isLoading}
      closable={false}
      maskClosable={false}
      width={300}
      footer={null}
      centered={true}
    >
      <div className="flex flex-col items-center">
        <Spin size="large" />
        <p className="font-bold mt-4">{message}</p>
      </div>
    </Modal>
  );
};
