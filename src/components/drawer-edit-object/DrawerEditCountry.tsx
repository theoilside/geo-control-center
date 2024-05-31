import { CountryUpdate } from "../../api/generated/model";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  useGetCountryByIdApiCountryIdGet,
  useUpdateCountryApiCountryIdPatch,
} from "../../api/generated/reactQuery/country/country.ts";
import { useObjectId } from "../../hooks/useObjectId.ts";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { HTTPValidationError } from "../../api/modals.ts";
import { ObjectRead } from "../../types/ObjectRead.ts";

type DrawerEditCountryProps = {
  isOpened: boolean;
  handleOpenedState: (isOpened: boolean) => void;
  refetchFunction: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ObjectRead, HTTPValidationError>>;
};

export function DrawerEditCountry({ ...props }: DrawerEditCountryProps) {
  const [form, setForm] = useState<CountryUpdate>();
  const { mutateAsync } = useUpdateCountryApiCountryIdPatch();
  const countryIndex = useObjectId();
  const toast = useToast();
  const { data: country } = useGetCountryByIdApiCountryIdGet(countryIndex);

  const updateForm = (newValue: CountryUpdate) => {
    setForm((prevState) => ({ ...prevState, ...newValue }));
  };

  const handleSubmit = async (form: CountryUpdate | undefined) => {
    await mutateAsync({ id: countryIndex, data: form as CountryUpdate })
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
          title: 'Ошибка 500',
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
            <Box>
              <FormLabel htmlFor="name">Название</FormLabel>
              <Input
                onChange={(e) => updateForm({ name: e.target.value })}
                defaultValue={country?.name}
                id="name"
                placeholder="Введите название страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="code_alpha2">Код (alpha-2)</FormLabel>
              <Input
                onChange={(e) => updateForm({ iso3116_alpha2: e.target.value })}
                defaultValue={country?.iso3116_alpha2}
                id="code_alpha2"
                placeholder="Введите двухбуквенный код страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="code_alpha3">Код (alpha-3)</FormLabel>
              <Input
                onChange={(e) => updateForm({ iso3166_alpha3: e.target.value })}
                defaultValue={country?.iso3166_alpha3}
                id="code_alpha3"
                placeholder="Введите трехбуквенный код страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="latitude">Широта</FormLabel>
              <Input
                onChange={(e) => updateForm({ latitude: +e.target.value })}
                defaultValue={country?.latitude}
                id="latitude"
                type={"number"}
                placeholder="Введите широту центральной точки страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="longitude">Долгота</FormLabel>
              <Input
                onChange={(e) => updateForm({ longitude: +e.target.value })}
                defaultValue={country?.longitude}
                id="longitude"
                type={"number"}
                placeholder="Введите долготу центральной точки страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="osm_type">Тип OSM</FormLabel>
              <Input
                onChange={(e) => updateForm({ osm_type: e.target.value })}
                defaultValue={country?.osm_type}
                id="osm_type"
                placeholder="Введите тип OSM"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="osm_id">OSM ID</FormLabel>
              <Input
                onChange={(e) => updateForm({ osm_id: e.target.value })}
                defaultValue={country?.osm_id}
                id="osm_id"
                placeholder="Введите OSM ID"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="phone_code">Телефонный код</FormLabel>
              <Input
                onChange={(e) => updateForm({ phone_code: e.target.value })}
                defaultValue={
                  country?.phone_code ? country.phone_code : undefined
                }
                id="phone_code"
                placeholder="Введите телефонный код"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="phone_mask">Телефонная маска</FormLabel>
              <Input
                onChange={(e) => updateForm({ phone_mask: e.target.value })}
                defaultValue={
                  country?.phone_mask ? country.phone_mask : undefined
                }
                id="phone_mask"
                placeholder="Введите телефонную маску"
              />
            </Box>
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
