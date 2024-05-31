import { CityUpdate } from "../../api/generated/model";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useObjectId } from "../../hooks/useObjectId.ts";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { HTTPValidationError } from "../../api/modals.ts";
import { ObjectRead } from "../../types/ObjectRead.ts";
import { useUpdateRegionApiRegionIdPatch } from "../../api/generated/reactQuery/region/region.ts";
import { ObjectFieldEditable } from "../object-field-editable/ObjectFieldEditable.tsx";
import { useGetCityByIdApiCityIdGet } from "../../api/generated/reactQuery/city/city.ts";

type DrawerEditCityProps = {
  isOpened: boolean;
  handleOpenedState: (isOpened: boolean) => void;
  refetchFunction: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ObjectRead, HTTPValidationError>>;
};

export function DrawerEditCity({ ...props }: DrawerEditCityProps) {
  const { mutateAsync } = useUpdateRegionApiRegionIdPatch();
  const cityIndex = useObjectId();
  const toast = useToast();
  const { data: city } = useGetCityByIdApiCityIdGet(cityIndex);
  const [form, setForm] = useState<Partial<CityUpdate>>({
    name: city?.name,
    iata: city?.iata,
    timezone: city?.timezone,
    latitude: city?.latitude,
    longitude: city?.longitude,
    osm_type: city?.osm_type,
    osm_id: city?.osm_id,
  });

  const updateForm = (
    field: keyof CityUpdate,
    value: CityUpdate[keyof CityUpdate],
  ) => {
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (form: CityUpdate | undefined) => {
    await mutateAsync({ id: cityIndex, data: form as CityUpdate })
      .then(() => {
        props.refetchFunction();
        props.handleOpenedState(false);
        toast({
          description: "Объект успешно отредактирован",
          status: "success",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Ошибка 500",
          description: "Проверьте правильность данных",
          status: "error",
          duration: 3000,
        });
      });
  };

  return (
    <Drawer
      isOpen={props.isOpened}
      placement="right"
      onClose={() => props.handleOpenedState(false)}
      size={"lg"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Редактировать</DrawerHeader>
        <DrawerBody>
          <Stack spacing="24px">
            <ObjectFieldEditable<CityUpdate>
              fieldName={"name"}
              fieldTitle={"Название"}
              value={form.name}
              handleFormUpdate={updateForm}
              placeholder={"Введите название города"}
            />
            <ObjectFieldEditable<CityUpdate>
              fieldName={"iata"}
              fieldTitle={"IATA-код"}
              value={form.iata}
              handleFormUpdate={updateForm}
              placeholder={"Введите IATA-код города"}
            />
            <ObjectFieldEditable<CityUpdate>
              fieldName={"timezone"}
              fieldTitle={"Часовой пояс"}
              value={form.timezone}
              handleFormUpdate={updateForm}
              placeholder={"Введите часовой пояс города"}
            />
            <ObjectFieldEditable<CityUpdate>
              fieldName={"latitude"}
              fieldTitle={"Широта"}
              value={form.latitude}
              handleFormUpdate={updateForm}
              placeholder={"Введите широту города"}
              type={"number"}
            />
            <ObjectFieldEditable<CityUpdate>
              fieldName={"longitude"}
              fieldTitle={"Долгота"}
              value={form.longitude}
              handleFormUpdate={updateForm}
              placeholder={"Введите долготу города"}
              type={"number"}
            />
            <ObjectFieldEditable<CityUpdate>
              fieldName={"osm_type"}
              fieldTitle={"Тип OSM"}
              value={form.osm_type}
              handleFormUpdate={updateForm}
              placeholder={"Введите тип OSM"}
            />
            <ObjectFieldEditable<CityUpdate>
              fieldName={"osm_id"}
              fieldTitle={"OSM ID"}
              value={form.osm_id}
              handleFormUpdate={updateForm}
              placeholder={"Введите OSM ID"}
              type={"number"}
            />
          </Stack>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button
            variant="outline"
            mr={3}
            onClick={() => props.handleOpenedState(false)}
          >
            Отменить
          </Button>
          <Button colorScheme="orange" onClick={() => handleSubmit(form)}>
            Сохранить
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
