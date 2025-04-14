import { useState } from "react";

export const useHandleSuccessModal = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const toggleOpenSuccessModal = (value: boolean) => {
    setOpenSuccessModal(value);
  };

  return {
    openSuccessModal,
    toggleOpenSuccessModal,
  };
};
