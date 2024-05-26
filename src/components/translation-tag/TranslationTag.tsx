import {
  Avatar,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  TagRightIcon,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { useUsersCurrentUserAuthMeGet } from "../../api/generated/reactQuery/auth/auth.ts";

type TranslationTagProps = {
  languageCode: string;
  currentTranslation: string | undefined;
  changeTranslation: (newTranslation: string) => void;
};

export function TranslationTag({ ...props }: TranslationTagProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [translation, setTranslation] = useState<string | undefined>(
    props.currentTranslation,
  );
  const [isError, setIsError] = useState<boolean>(false);
  const { data: currentUserData, isError: isErrorGettingCurrentUser } =
    useUsersCurrentUserAuthMeGet();

  function submitForm() {
    if (translation) {
      props.changeTranslation(translation);
      onClose();
    } else setIsError(true);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Изменение перевода</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftAddon textTransform={"uppercase"}>
                {props.languageCode}
              </InputLeftAddon>
              <Input
                defaultValue={translation}
                isInvalid={isError}
                onChange={(e) => {
                  setIsError(false);
                  setTranslation(e.target.value);
                }}
                placeholder="Введите перевод"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              variant={"ghost"}
              mr={3}
              onClick={onClose}
            >
              Отменить
            </Button>
            <Button onClick={submitForm} colorScheme="orange">
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tag size="md" colorScheme="gray" borderRadius="full">
        <Avatar
          src={
            props.languageCode === "kk"
              ? "http://purecatamphetamine.github.io/country-flag-icons/3x2/KZ.svg"
              : props.languageCode === "ru"
                ? "http://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg"
                : "http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
          }
          size="2xs"
          icon={<BiWorld fontSize={"1px"} />}
          ml={-1}
          mr={2}
        />
        <TagLabel>{props.currentTranslation}</TagLabel>
        {currentUserData && !isErrorGettingCurrentUser && (
          <TagRightIcon
            as={MdEdit}
            onClick={onOpen}
            style={{ cursor: "pointer" }}
          />
        )}
      </Tag>
    </>
  );
}
