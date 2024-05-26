import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Language } from "../../api/generated/model";
import { AddIcon } from "@chakra-ui/icons";

type TranslationAddModalProps = {
  language: Language;
  addTranslation: (languageCode: string, translation: string) => void;
};

export function TranslationAddModal({ ...props }: TranslationAddModalProps) {
  const [translation, setTranslation] = useState<string | null>(null);

  function submitForm(): void {
    if (translation)
      props.addTranslation(props.language.language_iso639, translation);
  }

  return (
    <HStack width={'100%'}>
      <InputGroup>
        <InputLeftAddon textTransform={"uppercase"}>
          {props.language.language_iso639}
        </InputLeftAddon>
        <Input
          onChange={(e) => setTranslation(e.target.value)}
          placeholder="Введите перевод"
        />
      </InputGroup>
      <IconButton
        colorScheme={"green"}
        aria-label="Добавить перевод"
        icon={<AddIcon />}
        onClick={submitForm}
      />
    </HStack>
  );
}
