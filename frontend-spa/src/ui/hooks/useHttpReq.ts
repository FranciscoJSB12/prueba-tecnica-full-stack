import { useEffect, useState } from "react";
import { UseMutationResult } from "react-query";

export const useHttpReq = (
  useMutationResult: UseMutationResult<any, unknown, any, unknown>
) => {
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSuccessModal, setOpenSuccesModal] = useState(false);
  const { isError, isLoading, error, isSuccess, data, mutate } =
    useMutationResult;

  const toggleOpenErrorModal = (value: boolean) => {
    setOpenErrorModal(value);
  };

  const toggleOpenSuccesModal = (value: boolean) => {
    setOpenSuccesModal(value);
  };

  useEffect(() => {
    if (isError && !isLoading) {
      setOpenErrorModal(true);
    }
  }, [isError, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setOpenSuccesModal(true);
    }
  }, [isSuccess]);

  return {
    isLoading,
    isSuccess,
    openErrorModal,
    openSuccessModal,
    toggleOpenErrorModal,
    toggleOpenSuccesModal,
    error,
    data,
    mutate,
  };
};
