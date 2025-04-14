import { Modal } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import "./ErrorModal.css";

interface ModalInfoProps {
  open: boolean;
  message: string;
  onClose: (value: boolean) => void;
}

export const ErrorModal = ({ message, onClose, open }: ModalInfoProps) => {
  return (
    <Modal
      open={open}
      closable={true}
      maskClosable={true}
      width={300}
      footer={null}
      centered={true}
      onCancel={() => onClose(false)}
    >
      <div className="flex flex-col items-center">
        <CloseCircleFilled className="text-danger error-modal__icon" />
        <p className="font-bold mt-4 text-center">{message}</p>
      </div>
    </Modal>
  );
};
