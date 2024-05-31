import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Flex,
  VStack,
  ScaleFade,
  Fade,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CITIES_PAGE } from "../../../routes/route-paths.ts";
import ErrorPage from "../../error-page/error-page.tsx";
import { useObjectId } from "../../../hooks/useObjectId.ts";
import { RowObjectInfoLink } from "../../../components/object-page/RowObjectInfoLink.tsx";
import Map from "../../../components/map/map.tsx";
import { HeaderWithAction } from "../../../components/object-page/HeaderWithActions.tsx";
import { formatDate } from "../../../components/formatDate.ts";
import { timeSince } from "../../../components/timeSince.ts";
import { useGetRegionByIdApiRegionIdGet } from "../../../api/generated/reactQuery/region/region.ts";
import { ConnectedObjectsInfo } from "../../../components/object-page/ConnectedObjectsInfo.tsx";
import { RowParentObjectInfo } from "../../../components/object-page/RowParentObjectInfo.tsx";
import {
  useGetLanguagesApiTranslateLanguageGet,
  useGetTranslateByIdApiTranslateGet,
} from "../../../api/generated/reactQuery/translate/translate.ts";
import { RowObjectTranslationsInfo } from "../../../components/object-page/RowObjectTranslationsInfo.tsx";
import {
  useGetCityByIdApiCityIdGet,
  useSearchCitiesApiCityGet,
  useUpdateCityApiCityIdPatch,
} from "../../../api/generated/reactQuery/city/city.ts";
import {RowObjectInfo} from "../../../components/object-page/RowObjectInfo.tsx";
import {useGetCountryByIdApiCountryIdGet} from "../../../api/generated/reactQuery/country/country.ts";

export default function CityPage() {
  const cityIndex = useObjectId();
  const toast = useToast();
  const { mutateAsync } = useUpdateCityApiCityIdPatch();
  const {
    data: city,
    isLoading,
    refetch,
    error,
  } = useGetCityByIdApiCityIdGet(cityIndex);
  const { data: connectedRegions } = useSearchCitiesApiCityGet({
    page_number: 1,
    page_size: 10,
    region_id: city?.region_id.toString(),
  });
  const { data: region, isLoading: regionLoading } =
    useGetRegionByIdApiRegionIdGet(city?.region_id ?? 1);
  const { data: country, isLoading: countryLoading } =
    useGetCountryByIdApiCountryIdGet(city?.country_id ?? 1);
  const { data: translations, refetch: refetchTranslations } =
    useGetTranslateByIdApiTranslateGet({
      entity: "city",
      entity_id: city?.id ?? 1,
    });
  const { data: languages } = useGetLanguagesApiTranslateLanguageGet();

  function updateTranslations() {
    refetchTranslations();
  }

  if (error) {
    return <ErrorPage />;
  }

  const handleChangeAutoUpdatable = async () => {
    await mutateAsync({
      id: cityIndex,
      data: { need_automatic_update: !city?.need_automatic_update },
    })
      .then(() => {
        refetch();
        toast({
          description: `Автообновление успешно ${city ? (city.need_automatic_update ? "выключено" : "включено") : "изменено"}`,
          status: "success",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Failed to change auto updatable property:", error);
      });
  };

  return (
    <VStack width={"100%"} spacing={"20px"} align={"left"}>
      <Fade in={!isLoading}>
        <Breadcrumb fontWeight="medium" fontSize="md">
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to={CITIES_PAGE}>
              Города
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Город #{city?.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Fade>
      <ScaleFade initialScale={0.95} in={!isLoading}>
        <Flex gap={"10px"}>
          <VStack flexGrow={1} width={"100%"}>
            <Card variant={"outline"} width={"100%"}>
              <HeaderWithAction
                objectTitle={city?.name}
                objectType={"Город"}
                objectId={city?.id}
                isAutoUpdatable={city?.need_automatic_update}
                deletedAt={formatDate(city?.deleted_at as string)}
                deletedAgo={timeSince(city?.deleted_at as string)}
                lastEditedAt={formatDate(city?.last_updated_at)}
                lastEditedAgo={timeSince(city?.last_updated_at)}
                refetchFunction={refetch}
                changeAutoUpdatableFunction={handleChangeAutoUpdatable}
                translations={translations}
              />
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <VStack width={'100%'}>
                    <RowParentObjectInfo
                      parentObjectType={"Страна"}
                      parentObjectId={country?.id}
                      parentObjectLink={"/countries/"}
                      parentObjectName={country?.name}
                      isLoading={countryLoading}
                    />
                    <RowParentObjectInfo
                      parentObjectType={"Регион"}
                      parentObjectId={region?.id}
                      parentObjectLink={"/regions/"}
                      parentObjectName={region?.name}
                      isLoading={regionLoading}
                    />
                  </VStack>
                  <RowObjectInfo
                    title={"Часовой пояс"}
                    content={city?.timezone}
                  />
                  {city?.iata &&
                      <RowObjectInfo
                          title={"Код"}
                          content={city?.iata}
                          tooltip={'IATA-код аэропорта в городе'}
                      />
                  }
                  <RowObjectInfoLink
                    title={"OSM (Nominatim)"}
                    link={`https://nominatim.openstreetmap.org/ui/details.html?osmtype=${city?.osm_type}&osmid=${city?.osm_id}`}
                    content={`${city?.osm_type}${city?.osm_id}`}
                  />
                  <RowObjectTranslationsInfo
                    translations={translations}
                    refetchTranslations={updateTranslations}
                    languages={languages}
                  />
                </Stack>
              </CardBody>
            </Card>
          </VStack>
          <Skeleton isLoaded={!isLoading || city !== undefined}>
            {city && (
              <Map
                pointGeometry={{
                  lat: city.latitude,
                  lon: city.longitude,
                }}
                pointName={city.name}
                pointType={"город"}
                zoom={8}
              />
            )}
          </Skeleton>
        </Flex>
      </ScaleFade>
      <ConnectedObjectsInfo
        connectedObjects={connectedRegions?.data.filter(
          (object) => object.id !== cityIndex,
        )}
        connectedObjectsTypeName={"Город"}
        headerTitle={"Относятся к тому же региону"}
        goToSearchLink={`/cities?regionId=${city?.region_id}`}
        goToObjectLink={"/cities/"}
        isAllObjectsShown={connectedRegions?.pagination.total_pages === 1}
      />
    </VStack>
  );
}
