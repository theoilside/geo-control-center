import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
  Text, Card,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDeleteCountryApiCountryIdDelete } from "../../api/generated/reactQuery/country/country.ts";
import { useObjectId } from "../../hooks/useObjectId.ts";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { HTTPValidationError } from "../../api/modals.ts";
import { ObjectRead } from "../../types/ObjectRead.ts";

type RemoveObjectAlertProps = {
  objectName?: string;
  objectType: string;
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
  const toast = useToast();
  const { mutateAsync } = useDeleteCountryApiCountryIdDelete();
  const handleSubmit = async () => {
    await mutateAsync({ id: countryIndex })
      .then(() => {
        props.refetchFunction();
        props.handleOpenedState(false);
        toast({
          description: "Объект успешно удален",
          status: "success",
          duration: 3000,
        });
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
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Удаление объекта
          </AlertDialogHeader>
          <AlertDialogBody>
            <Card variant={'outline'} padding={'10px'}>
              <Text fontSize={'sm'}>
                {`${props.objectType} #${props.objectId}`}
              </Text>
              <Text as='b'>
                {`${props.objectName}`}
              </Text>
            </Card>
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
