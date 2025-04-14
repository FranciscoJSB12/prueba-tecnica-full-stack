import { useEffect } from "react";
import { UseMutationResult } from "react-query";
import { useHandleErrorModal } from "./useHandleErrorModal";
import { useHandleSuccessModal } from "./useHandleSuccesModal";

export const useMutationReq = (
  useMutationResult: UseMutationResult<any, unknown, any, unknown>
) => {
  const { openErrorModal, toggleOpenErrorModal } = useHandleErrorModal();
  const { openSuccessModal, toggleOpenSuccessModal } = useHandleSuccessModal();

  const { isError, isLoading, error, isSuccess, data, mutate } =
    useMutationResult;

  useEffect(() => {
    if (isError && !isLoading) {
      toggleOpenErrorModal(true);
    }
  }, [isError, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toggleOpenSuccessModal(true);
    }
  }, [isSuccess]);

  return {
    isLoading,
    isSuccess,
    openErrorModal,
    openSuccessModal,
    toggleOpenErrorModal,
    toggleOpenSuccessModal,
    error,
    data,
    mutate,
  };
};
