import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDeleteCountryApiCountryIdDelete } from "../../api/generated/reactQuery/country/country.ts";
import { useObjectId } from "../../hooks/useObjectId.ts";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { HTTPValidationError } from "../../api/modals.ts";
import {ObjectRead} from "../../types/ObjectRead.ts";

type RemoveObjectAlertProps = {
  objectName?: string;
  objectId?: number;
  isOpened: boolean;
  handleOpenedState: (isOpened: boolean) => void;
  refetchFunction: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ObjectRead, HTTPValidationError>>;
};

export function RemoveObjectAlert({ ...props }: RemoveObjectAlertProps) {
  const cancelRef = useRef(null);
  const countryIndex = useObjectId();
  const { mutateAsync } = useDeleteCountryApiCountryIdDelete();
  const handleSubmit = async () => {
    await mutateAsync({ id: countryIndex })
      .then(() => {
        props.refetchFunction();
        props.handleOpenedState(false);
      })
      .catch((error) => {
        console.error("Failed to delete:", error);
      });
  };

  return (
    <AlertDialog
      isOpen={props.isOpened}
      leastDestructiveRef={cancelRef}
      onClose={() => props.handleOpenedState(false)}
      motionPreset='slideInBottom'
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Удаление объекта
          </AlertDialogHeader>
          {/*TODO: добавить больше инфы в модалку */}
          <AlertDialogBody>
            Вы уверены, что хотите удалить {props.objectName}?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => props.handleOpenedState(false)}
            >
              Отменить
            </Button>
            <Button colorScheme="red" onClick={handleSubmit} ml={3}>
              Удалить объект
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
