import {CityCreate} from "../../api/generated/model";
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
import { useNavigate } from "react-router-dom";
import {getCityPagePathById} from "../../routes/routes.ts";
import {ObjectFieldEditable} from "../object-field-editable/ObjectFieldEditable.tsx";
import {useAddCityApiCityPost} from "../../api/generated/reactQuery/city/city.ts";

type DrawerAddCityProps = {
  isOpened: boolean;
  handleOpenedState: (isOpened: boolean) => void;
}

export function DrawerAddCity({...props}: DrawerAddCityProps) {
  const firstField = useRef(null);
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<CityCreate>>({
    need_automatic_update: false,
  });
  const toast = useToast();

  const { mutateAsync } = useAddCityApiCityPost({
    mutation: {
      onSuccess: (data) => {
        navigate(getCityPagePathById(data.id));
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

  const updateForm = (field: keyof CityCreate, value: CityCreate[keyof CityCreate]) => {
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
          Добавить новый город
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing="24px">
            <ObjectFieldEditable<CityCreate>
              fieldName={'name'}
              fieldTitle={'Название'}
              value={form.latitude}
              handleFormUpdate={updateForm}
              placeholder={'Введите название города'}
            />
            <ObjectFieldEditable<CityCreate>
              fieldName={'latitude'}
              fieldTitle={'Широта'}
              value={form.latitude}
              handleFormUpdate={updateForm}
              placeholder={'Введите широту центральной точки города'}
              type={'number'}
            />
            <ObjectFieldEditable<CityCreate>
              fieldName={'longitude'}
              fieldTitle={'Долгота'}
              value={form.longitude}
              handleFormUpdate={updateForm}
              placeholder={'Введите долготу центральной точки города'}
              type={'number'}
            />
            <ObjectFieldEditable<CityCreate>
              fieldName={'iata'}
              fieldTitle={'IATA-код'}
              value={form.iata}
              handleFormUpdate={updateForm}
              placeholder={'Введите IATA-код'}
            />
            <ObjectFieldEditable<CityCreate>
              fieldName={'timezone'}
              fieldTitle={'Часовой пояс'}
              value={form.timezone}
              handleFormUpdate={updateForm}
              placeholder={'Введите часовой пояс'}
            />
            <ObjectFieldEditable<CityCreate>
              fieldName={'osm_type'}
              fieldTitle={'Тип OSM'}
              value={form.osm_type}
              handleFormUpdate={updateForm}
              placeholder={'Введите тип OSM'}
            />
            <ObjectFieldEditable<CityCreate>
              fieldName={'osm_id'}
              fieldTitle={'OSM ID'}
              value={form.osm_id}
              handleFormUpdate={updateForm}
              placeholder={'Введите OSM ID'}
            />
          </Stack>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={() => props.handleOpenedState(false)}>
            Отменить
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => mutateAsync({ data: form as CityCreate })}
          >
            Добавить
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
