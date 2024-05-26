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
import { REGIONS_PAGE } from "../../../routes/route-paths.ts";
import ErrorPage from "../../error-page/error-page.tsx";
import { useObjectId } from "../../../hooks/useObjectId.ts";
import { RowObjectInfoLink } from "../../../components/object-page/RowObjectInfoLink.tsx";
import Map from "../../../components/map/map.tsx";
import { HeaderWithAction } from "../../../components/object-page/HeaderWithActions.tsx";
import { formatDate } from "../../../components/formatDate.ts";
import { timeSince } from "../../../components/timeSince.ts";
import {
  useGetRegionByIdApiRegionIdGet,
  useSearchRegionsApiRegionGet,
  useUpdateRegionApiRegionIdPatch,
} from "../../../api/generated/reactQuery/region/region.ts";
import { ConnectedObjectsInfo } from "../../../components/object-page/ConnectedObjectsInfo.tsx";
import { useGetCountryByIdApiCountryIdGet } from "../../../api/generated/reactQuery/country/country.ts";
import { RowParentObjectInfo } from "../../../components/object-page/RowParentObjectInfo.tsx";
import {
  useGetLanguagesApiTranslateLanguageGet,
  useGetTranslateByIdApiTranslateGet
} from "../../../api/generated/reactQuery/translate/translate.ts";
import {RowObjectTranslationsInfo} from "../../../components/object-page/RowObjectTranslationsInfo.tsx";

function RegionPage() {
  const regionIndex = useObjectId();
  const toast = useToast();
  const { mutateAsync } = useUpdateRegionApiRegionIdPatch();
  const {
    data: region,
    isLoading,
    refetch,
    error,
  } = useGetRegionByIdApiRegionIdGet(regionIndex);
  const { data: connectedRegions } = useSearchRegionsApiRegionGet({
    page_number: 1,
    page_size: 10,
    country_id: region?.country_id.toString(),
  });
  const { data: country, isLoading: countryLoading } =
    useGetCountryByIdApiCountryIdGet(region?.country_id ?? 1);
  const { data: translations, refetch: refetchTranslations } = useGetTranslateByIdApiTranslateGet({
    entity: "region",
    entity_id: region?.id ?? 1,
  });
  const {data: languages} = useGetLanguagesApiTranslateLanguageGet();

  function updateTranslations() {
    refetchTranslations();
  }

  if (error) {
    return <ErrorPage />;
  }

  const handleChangeAutoUpdatable = async () => {
    await mutateAsync({
      id: regionIndex,
      data: { need_automatic_update: !region?.need_automatic_update },
    })
      .then(() => {
        refetch();
        toast({
          description: `Автообновление успешно ${region ? (region.need_automatic_update ? "выключено" : "включено") : "изменено"}`,
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
            <BreadcrumbLink as={RouterLink} to={REGIONS_PAGE}>
              Регионы
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Регион #{region?.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Fade>
      <ScaleFade initialScale={0.95} in={!isLoading}>
        <Flex gap={"10px"}>
          <VStack flexGrow={1} width={"100%"}>
            <Card variant={"outline"} width={"100%"}>
              <HeaderWithAction
                objectTitle={region?.name}
                objectType={"Регион"}
                objectId={region?.id}
                isAutoUpdatable={region?.need_automatic_update}
                deletedAt={formatDate(region?.deleted_at as string)}
                deletedAgo={timeSince(region?.deleted_at as string)}
                lastEditedAt={formatDate(region?.last_updated_at)}
                lastEditedAgo={timeSince(region?.last_updated_at)}
                refetchFunction={refetch}
                changeAutoUpdatableFunction={handleChangeAutoUpdatable}
                translations={translations}
              />
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <RowParentObjectInfo
                    parentObjectType={"Страна"}
                    parentObjectId={country?.id}
                    parentObjectLink={"/countries/"}
                    parentObjectName={country?.name}
                    isLoading={countryLoading}
                  />
                  <RowObjectInfoLink
                    title={"OSM (Nominatim)"}
                    link={`https://nominatim.openstreetmap.org/ui/details.html?osmtype=${region?.osm_type}&osmid=${region?.osm_id}`}
                    content={`${region?.osm_type}${region?.osm_id}`}
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
          <Skeleton isLoaded={!isLoading || region !== undefined}>
            {region && (
              <Map
                pointGeometry={{
                  lat: region.latitude,
                  lon: region.longitude,
                }}
                pointName={region.name}
                pointType={"страна"}
                zoom={5}
              />
            )}
          </Skeleton>
        </Flex>
      </ScaleFade>
      <ConnectedObjectsInfo
        connectedObjects={connectedRegions?.data.filter(
          (object) => object.id !== regionIndex,
        )}
        connectedObjectsTypeName={"Регион"}
        headerTitle={"Относятся к той же стране"}
        goToSearchLink={`/regions?countryId=${region?.country_id}`}
        goToObjectLink={"/regions/"}
        isAllObjectsShown={connectedRegions?.pagination.total_pages === 1}
      />
    </VStack>
  );
}

export default RegionPage;
