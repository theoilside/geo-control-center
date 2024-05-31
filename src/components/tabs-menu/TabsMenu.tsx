import { Flex, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {CITIES_PAGE, COUNTRIES_PAGE, REGIONS_PAGE} from "../../routes/route-paths.ts";

type TabsMenuProps = {
  selectedTabIndex?: number;
};

export default function TabsMenu({ ...props }: TabsMenuProps) {
  const navigate = useNavigate();

  return (
    <Flex w={"100%"} wrap={"nowrap"}>
      <Tabs
        defaultIndex={props.selectedTabIndex ?? 0}
        variant="soft-rounded"
        colorScheme="orange"
      >
        <TabList>
          <Tab onClick={() => navigate(COUNTRIES_PAGE)}>Страны</Tab>
          <Tab onClick={() => navigate(REGIONS_PAGE)}>Регионы</Tab>
          <Tab onClick={() => navigate(CITIES_PAGE)}>Города</Tab>
          <Tab>Аэропорты</Tab>
          <Tab>Ж/д-станции</Tab>
        </TabList>
      </Tabs>
    </Flex>
  );
}
