import { useState } from "react";

export const useHandleErrorModal = () => {
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const toggleOpenErrorModal = (value: boolean) => {
    setOpenErrorModal(value);
  };

  return {
    openErrorModal,
    toggleOpenErrorModal,
  };
};
