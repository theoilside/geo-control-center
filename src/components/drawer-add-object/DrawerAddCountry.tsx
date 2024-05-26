import { CountryCreate } from "../../api/generated/model";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack, useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAddCountryApiCountryPost } from "../../api/generated/reactQuery/country/country.ts";
import { useNavigate } from "react-router-dom";
import { getCountryPagePathById } from "../../routes/routes.ts";
import {ObjectFieldEditable} from "../object-field-editable/ObjectFieldEditable.tsx";

type DrawerAddCountryProps = {
  isOpened: boolean;
  handleOpenedState: (isOpened: boolean) => void;
}

export function DrawerAddCountry({...props}: DrawerAddCountryProps) {
  const firstField = useRef(null);
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<CountryCreate>>({
    need_automatic_update: false,
  });
  const toast = useToast();

  const { mutateAsync } = useAddCountryApiCountryPost({
    mutation: {
      onSuccess: (data) => {
        navigate(getCountryPagePathById(data.id));
      },
      onError: async () => {
        toast({
          title: "Ошибка",
          description: 'Проверьте введенные данные',
          variant: "subtle",
          status: "error",
          duration: 3000,
        });
      }
    },
  });

  const updateForm = (field: keyof CountryCreate, value: CountryCreate[keyof CountryCreate]) => {
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <Drawer
      isOpen={props.isOpened}
      placement="right"
      initialFocusRef={firstField}
      onClose={() => props.handleOpenedState(false)}
      size={"lg"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Добавить новую страну
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing="24px">
            <ObjectFieldEditable<CountryCreate>
                fieldName={'name'}
                fieldTitle={'Название'}
                value={form.name}
                handleFormUpdate={updateForm}
                placeholder={'Введите название страны'}
            />
            <ObjectFieldEditable<CountryCreate>
                fieldName={'iso3116_alpha2'}
                fieldTitle={'Код (alpha-2)'}
                value={form.iso3116_alpha2}
                handleFormUpdate={updateForm}
                placeholder={'Введите двухбуквенный код страны'}
            />
            <ObjectFieldEditable<CountryCreate>
                fieldName={'iso3166_alpha3'}
                fieldTitle={'Код (alpha-3)'}
                value={form.iso3166_alpha3}
                handleFormUpdate={updateForm}
                placeholder={'Введите трехбуквенный код страны'}
            />
            <ObjectFieldEditable<CountryCreate>
                fieldName={'latitude'}
                fieldTitle={'Широта'}
                value={form.latitude}
                handleFormUpdate={updateForm}
                placeholder={'Введите широту центральной точки страны'}
                type={'number'}
            />
            <ObjectFieldEditable<CountryCreate>
                fieldName={'longitude'}
                fieldTitle={'Долгота'}
                value={form.longitude}
                handleFormUpdate={updateForm}
                placeholder={'Введите долготу центральной точки страны'}
                type={'number'}
            />
            <ObjectFieldEditable<CountryCreate>
                fieldName={'osm_type'}
                fieldTitle={'Тип OSM'}
                value={form.osm_type}
                handleFormUpdate={updateForm}
                placeholder={'Введите тип OSM'}
            />
            <ObjectFieldEditable<CountryCreate>
                fieldName={'osm_id'}
                fieldTitle={'OSM ID'}
                value={form.osm_id}
                handleFormUpdate={updateForm}
                placeholder={'Введите OSM ID'}
            />
            <ObjectFieldEditable<CountryCreate>
                fieldName={'phone_code'}
                fieldTitle={'Телефонный код'}
                value={form.phone_code}
                handleFormUpdate={updateForm}
                placeholder={'Введите телефонный код'}
            />
            <ObjectFieldEditable<CountryCreate>
                fieldName={'phone_mask'}
                fieldTitle={'Телефонная маска'}
                value={form.phone_mask}
                handleFormUpdate={updateForm}
                placeholder={'Введите телефонную маску'}
            />
          </Stack>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={() => props.handleOpenedState(false)}>
            Отменить
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => mutateAsync({ data: form as CountryCreate })}
          >
            Добавить
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
