import { CountryCreate } from "../../api/generated/model";
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
  Switch,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAddCountryApiCountryPost } from "../../api/generated/reactQuery/country/country.ts";
import { useNavigate } from "react-router-dom";
import { getCountryPagePathById } from "../../routes/routes.ts";

type DrawerAddObjectProps = {
  isOpened: boolean;
  handleOpenedState: (isOpened: boolean) => void;
}

export function DrawerAddObject({...props}: DrawerAddObjectProps) {
  const firstField = useRef(null);
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<CountryCreate>>({
    need_automatic_update: false,
  });
  const { mutateAsync } = useAddCountryApiCountryPost({
    mutation: {
      onSuccess: (data) => {
        navigate(getCountryPagePathById(data.id));
      },
    },
  });

  const updateForm = (newValue: Partial<CountryCreate>) => {
    setForm((prevState) => ({ ...prevState, ...newValue }));
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
            <Box>
              <FormLabel htmlFor="name">Название</FormLabel>
              <Input
                onChange={(e) => updateForm({ name: e.target.value })}
                ref={firstField}
                id="name"
                placeholder="Введите название страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="code_alpha2">Код (alpha-2)</FormLabel>
              <Input
                onChange={(e) => updateForm({ iso3116_alpha2: e.target.value })}
                id="code_alpha2"
                placeholder="Введите двухбуквенный код страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="code_alpha3">Код (alpha-3)</FormLabel>
              <Input
                onChange={(e) => updateForm({ iso3166_alpha3: e.target.value })}
                id="code_alpha3"
                placeholder="Введите трехбуквенный код страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="latitude">Широта</FormLabel>
              <Input
                  onChange={(e) => updateForm({ latitude: +e.target.value })}
                  id="latitude"
                  type={"number"}
                  placeholder="Введите широту центральной точки страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="longitude">Долгота</FormLabel>
              <Input
                  onChange={(e) => updateForm({ longitude: +e.target.value })}
                  id="longitude"
                  type={"number"}
                  placeholder="Введите долготу центральной точки страны"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="osm_type">Тип OSM</FormLabel>
              <Input
                onChange={(e) => updateForm({ osm_type: e.target.value })}
                id="osm_type"
                placeholder="Введите тип OSM"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="osm_id">OSM ID</FormLabel>
              <Input
                onChange={(e) => updateForm({ osm_id: e.target.value })}
                id="osm_id"
                placeholder="Введите OSM ID"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="phone_code">Телефонный код</FormLabel>
              <Input
                onChange={(e) => updateForm({ phone_code: e.target.value })}
                id="phone_code"
                placeholder="Введите телефонный код"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="phone_mask">Телефонная маска</FormLabel>
              <Input
                onChange={(e) => updateForm({ phone_mask: e.target.value })}
                id="phone_mask"
                placeholder="Введите телефонную маску"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="need_automatic_update" mb="0">
                Включить автообновление?
              </FormLabel>
              <Switch
                onChange={(e) => console.log(e)}
                id="need_automatic_update"
              />
            </Box>
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
