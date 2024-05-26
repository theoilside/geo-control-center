import {
  Box,
  Heading,
  HStack,
  Spinner,
  Flex,
  useToast,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Language, TranslateRead } from "../../api/generated/model";
import { TranslationTag } from "../translation-tag/TranslationTag.tsx";
import {
  useAddTranslateApiTranslatePost,
  useUpdateTranslateApiTranslatePatch,
} from "../../api/generated/reactQuery/translate/translate.ts";
import { AddIcon } from "@chakra-ui/icons";
import { TranslationAddModal } from "../translation-add-modal/TranslationAddModal.tsx";
import { useUsersCurrentUserAuthMeGet } from "../../api/generated/reactQuery/auth/auth.ts";

type RowObjectTranslationsInfoProps = {
  translations: TranslateRead[] | undefined;
  refetchTranslations: () => void;
  languages: Language[] | undefined;
};

export function RowObjectTranslationsInfo({
  ...props
}: RowObjectTranslationsInfoProps) {
  const { mutateAsync: mutateUpdate } = useUpdateTranslateApiTranslatePatch();
  const { mutateAsync: mutateAdd } = useAddTranslateApiTranslatePost();
  const { data: currentUserData, isError: isErrorGettingCurrentUser } =
    useUsersCurrentUserAuthMeGet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  function getEntityType(translations: TranslateRead[] | undefined): string {
    if (translations && translations[0]) {
      return translations[0].entity;
    }
    return "country";
  }

  function getEntityId(translations: TranslateRead[] | undefined): number {
    if (translations && translations[0]) {
      return translations[0].entity_id;
    }
    return 0;
  }

  function getAbsentLanguages(
    languages: Language[] | undefined,
    translations: TranslateRead[] | undefined,
  ): Language[] | undefined {
    if (translations && languages) {
      const translationLanguages = new Set(
        translations.map((translation) => translation.language),
      );
      return languages.filter(
        (language) => !translationLanguages.has(language.language_iso639),
      );
    }
    return undefined;
  }

  async function changeTranslation(
    languageCode: string,
    newTranslation: string,
  ) {
    await mutateUpdate({
      params: {
        entity: getEntityType(props.translations),
        entity_id: getEntityId(props.translations),
        language: languageCode,
      },
      data: {
        translate: newTranslation,
      },
    }).then(() => {
      props.refetchTranslations();
      toast({
        description: "Перевод успешно изменен",
        status: "success",
        duration: 3000,
      });
    });
  }

  async function addTranslation(languageCode: string, translation: string) {
    await mutateAdd({
      data: [
        {
          entity: getEntityType(props.translations),
          entity_id: getEntityId(props.translations),
          language: languageCode,
          translate: translation,
        },
      ],
    }).then(() => {
      props.refetchTranslations();
      onClose();
      toast({
        description: "Перевод успешно добавлен",
        status: "success",
        duration: 3000,
      });
    });
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавление перевода</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={"15px"}>
              {getAbsentLanguages(props.languages, props.translations)?.map(
                (language) => (
                  <TranslationAddModal
                    language={language}
                    addTranslation={(languageCode, translation) =>
                      addTranslation(languageCode, translation)
                    }
                    key={language.language_iso639}
                  />
                ),
              )}
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Box>
        <HStack>
          <Heading size="xs">Переводы названия</Heading>
        </HStack>
        {props.translations ? (
          <Flex
            width={"100%"}
            flexWrap={"wrap"}
            gap={"10px"}
            paddingTop={"8px"}
          >
            {props.translations.map((translation) => (
              <TranslationTag
                languageCode={translation.language}
                currentTranslation={translation.translate}
                changeTranslation={(newTranslation) =>
                  changeTranslation(translation.language, newTranslation)
                }
                key={translation.language}
              />
            ))}
            {props.languages?.length !== props.translations.length &&
              currentUserData &&
              !isErrorGettingCurrentUser && (
                <IconButton
                  colorScheme={"orange"}
                  size={"xs"}
                  isRound={true}
                  aria-label="Добавить перевод"
                  icon={<AddIcon />}
                  onClick={onOpen}
                />
              )}
          </Flex>
        ) : (
          <Spinner />
        )}
      </Box>
    </>
  );
}
