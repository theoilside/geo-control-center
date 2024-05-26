import { RegionCreate } from "../../api/generated/model";
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
import {getRegionPagePathById} from "../../routes/routes.ts";
import {ObjectFieldEditable} from "../object-field-editable/ObjectFieldEditable.tsx";
import {useAddRegionApiRegionPost} from "../../api/generated/reactQuery/region/region.ts";

type DrawerAddRegionProps = {
    isOpened: boolean;
    handleOpenedState: (isOpened: boolean) => void;
}

export function DrawerAddRegion({...props}: DrawerAddRegionProps) {
    const firstField = useRef(null);
    const navigate = useNavigate();
    const [form, setForm] = useState<Partial<RegionCreate>>({
        need_automatic_update: false,
    });
    const toast = useToast();

    const { mutateAsync } = useAddRegionApiRegionPost({
        mutation: {
            onSuccess: (data) => {
                navigate(getRegionPagePathById(data.id));
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

    const updateForm = (field: keyof RegionCreate, value: RegionCreate[keyof RegionCreate]) => {
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
                    Добавить новый регион
                </DrawerHeader>
                <DrawerBody>
                    <Stack spacing="24px">
                        <ObjectFieldEditable<RegionCreate>
                            fieldName={'name'}
                            fieldTitle={'Название'}
                            value={form.latitude}
                            handleFormUpdate={updateForm}
                            placeholder={'Введите название региона'}
                        />
                        <ObjectFieldEditable<RegionCreate>
                            fieldName={'latitude'}
                            fieldTitle={'Широта'}
                            value={form.latitude}
                            handleFormUpdate={updateForm}
                            placeholder={'Введите широту центральной точки региона'}
                            type={'number'}
                        />
                        <ObjectFieldEditable<RegionCreate>
                            fieldName={'longitude'}
                            fieldTitle={'Долгота'}
                            value={form.longitude}
                            handleFormUpdate={updateForm}
                            placeholder={'Введите долготу центральной точки региона'}
                            type={'number'}
                        />
                        <ObjectFieldEditable<RegionCreate>
                            fieldName={'osm_type'}
                            fieldTitle={'Тип OSM'}
                            value={form.osm_type}
                            handleFormUpdate={updateForm}
                            placeholder={'Введите тип OSM'}
                        />
                        <ObjectFieldEditable<RegionCreate>
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
                        onClick={() => mutateAsync({ data: form as RegionCreate })}
                    >
                        Добавить
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
