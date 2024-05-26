import {RegionUpdate} from "../../api/generated/model";
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
import {
  useGetRegionByIdApiRegionIdGet,
  useUpdateRegionApiRegionIdPatch
} from "../../api/generated/reactQuery/region/region.ts";
import {ObjectFieldEditable} from "../object-field-editable/ObjectFieldEditable.tsx";

type DrawerEditRegionProps = {
  isOpened: boolean;
  handleOpenedState: (isOpened: boolean) => void;
  refetchFunction: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ObjectRead, HTTPValidationError>>;
};

export function DrawerEditRegion({ ...props }: DrawerEditRegionProps) {
  const { mutateAsync } = useUpdateRegionApiRegionIdPatch();
  const regionIndex = useObjectId();
  const toast = useToast();
  const { data: region } = useGetRegionByIdApiRegionIdGet(regionIndex);
  const [form, setForm] = useState<Partial<RegionUpdate>>({
    name: region?.name,
    latitude: region?.latitude,
    longitude: region?.longitude,
    osm_type: region?.osm_type,
    osm_id: region?.osm_id,
  });

  const updateForm = (field: keyof RegionUpdate, value: RegionUpdate[keyof RegionUpdate]) => {
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (form: RegionUpdate | undefined) => {
    await mutateAsync({ id: regionIndex, data: form as RegionUpdate })
      .then(() => {
        props.refetchFunction();
        props.handleOpenedState(false);
        toast({
          description: "Объект успешно отредактирован",
          status: "success",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Failed to update:", error);
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
            <ObjectFieldEditable<RegionUpdate>
                fieldName={'name'}
                fieldTitle={'Название'}
                value={form.name}
                handleFormUpdate={updateForm}
                placeholder={'Введите название региона'}
            />
            <ObjectFieldEditable<RegionUpdate>
                fieldName={'latitude'}
                fieldTitle={'Широта'}
                value={form.latitude}
                handleFormUpdate={updateForm}
                placeholder={'Введите широту региона'}
                type={'number'}
            />
            <ObjectFieldEditable<RegionUpdate>
                fieldName={'longitude'}
                fieldTitle={'Долгота'}
                value={form.longitude}
                handleFormUpdate={updateForm}
                placeholder={'Введите долготу региона'}
                type={'number'}
            />
            <ObjectFieldEditable<RegionUpdate>
                fieldName={'osm_type'}
                fieldTitle={'Тип OSM'}
                value={form.osm_type}
                handleFormUpdate={updateForm}
                placeholder={'Введите тип OSM'}
            />
            <ObjectFieldEditable<RegionUpdate>
                fieldName={'osm_id'}
                fieldTitle={'OSM ID'}
                value={form.osm_id}
                handleFormUpdate={updateForm}
                placeholder={'Введите OSM ID'}
                type={'number'}
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
