import {Flex, Tabs, TabList, Tab} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {COUNTRIES_PAGE, REGIONS_PAGE} from "../../routes/route-paths.ts";

function TabsMenu({...props}: TabsMenuProps) {
    const navigate = useNavigate();

    return (
        <Flex w={'100%'} wrap={'nowrap'}>
            <Tabs
                defaultIndex={props.selectedTabIndex ?? 0}
                variant='soft-rounded'
                colorScheme='orange'
            >
                <TabList>
                    <Tab onClick={() => navigate(COUNTRIES_PAGE)}>Страны</Tab>
                    <Tab onClick={() => navigate(REGIONS_PAGE)}>Регионы</Tab>
                    <Tab isDisabled>Города</Tab>
                    <Tab isDisabled>Аэропорты</Tab>
                    <Tab isDisabled>Ж/д-станции</Tab>
                    <Tab isDisabled>Станции метро</Tab>
                </TabList>
            </Tabs>
        </Flex>
    )
}

type TabsMenuProps = {
    selectedTabIndex?: number;
}

export default TabsMenu;
