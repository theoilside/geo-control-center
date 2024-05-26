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
  Skeleton, useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { COUNTRIES_PAGE } from "../../../routes/route-paths.ts";
import ErrorPage from "../../error-page/error-page.tsx";
import {
  useGetCountryByIdApiCountryIdGet,
  useUpdateCountryApiCountryIdPatch
} from "../../../api/generated/reactQuery/country/country.ts";
import { useObjectId } from "../../../hooks/useObjectId.ts";
import { RowObjectInfo } from "../../../components/object-page/RowObjectInfo.tsx";
import { RowObjectInfoLink } from "../../../components/object-page/RowObjectInfoLink.tsx";
import Map from "../../../components/map/map.tsx";
import {HeaderWithAction} from "../../../components/object-page/HeaderWithActions.tsx";
import {formatDate} from "../../../components/formatDate.ts";
import {timeSince} from "../../../components/timeSince.ts";
import {RowObjectTranslationsInfo} from "../../../components/object-page/RowObjectTranslationsInfo.tsx";
import {
  useGetLanguagesApiTranslateLanguageGet,
  useGetTranslateByIdApiTranslateGet
} from "../../../api/generated/reactQuery/translate/translate.ts";

function CountryPage() {
  const countryIndex = useObjectId();
  const toast = useToast();
  const { data: country, isLoading, refetch, error } =
    useGetCountryByIdApiCountryIdGet(countryIndex);
  const { mutateAsync } = useUpdateCountryApiCountryIdPatch();
  const { data: translations, refetch: refetchTranslations } = useGetTranslateByIdApiTranslateGet({
    entity: "country",
    entity_id: country?.id ?? 1,
  });
  const {data: languages} = useGetLanguagesApiTranslateLanguageGet();

  function updateTranslations() {
    refetchTranslations();
  }

  if (error) {
    return <ErrorPage />;
  }

  const handleChangeAutoUpdatable = async () => {
    await mutateAsync({ id: countryIndex, data: { need_automatic_update: !country?.need_automatic_update } })
        .then(() => {
          refetch();
          toast({
            description: `Автообновление успешно ${country ? (country.need_automatic_update ? 'выключено' : 'включено') : 'изменено'}`,
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
            <BreadcrumbLink as={RouterLink} to={COUNTRIES_PAGE}>
              Страны
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Страна #{country?.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Fade>
      <ScaleFade initialScale={0.95} in={!isLoading}>
        <Flex gap={"10px"}>
          <Card variant={"outline"} flexGrow={1}>
            <HeaderWithAction
                objectTitle={country?.name}
                objectType={'Страна'}
                objectId={country?.id}
                objectCode={country?.iso3116_alpha2}
                isAutoUpdatable={country?.need_automatic_update}
                deletedAt={formatDate(country?.deleted_at as string)}
                deletedAgo={timeSince(country?.deleted_at as string)}
                lastEditedAt={formatDate(country?.last_updated_at)}
                lastEditedAgo={timeSince(country?.last_updated_at)}
                refetchFunction={refetch}
                changeAutoUpdatableFunction={handleChangeAutoUpdatable}
            />
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <RowObjectInfo
                  title={"Код (alpha-2)"}
                  content={country?.iso3116_alpha2}
                  tooltip={'ISO 3116'}
                />
                <RowObjectInfo
                  title={"Код (alpha-3)"}
                  content={country?.iso3166_alpha3}
                  tooltip={'ISO 3166'}
                />
                {country?.phone_code &&
                    <RowObjectInfo
                        title={"Телефонный код"}
                        content={country?.phone_code}
                    />
                }
                {country?.phone_mask &&
                    <RowObjectInfo
                        title={"Телефонная маска"}
                        content={country?.phone_mask}
                        tooltip={'. — любая цифра'}
                    />
                }
                <RowObjectInfoLink
                  title={"OSM (Nominatim)"}
                  link={`https://nominatim.openstreetmap.org/ui/details.html?osmtype=${country?.osm_type}&osmid=${country?.osm_id}`}
                  content={`${country?.osm_type}${country?.osm_id}`}
                />
                <RowObjectTranslationsInfo
                  translations={translations}
                  refetchTranslations={updateTranslations}
                  languages={languages}
                />
              </Stack>
            </CardBody>
          </Card>
          <Skeleton isLoaded={!isLoading || country !== undefined}>
            {country && (
              <Map
                pointGeometry={{
                  lat: country.latitude,
                  lon: country.longitude,
                }}
                pointName={country.name}
                pointType={"страна"}
                zoom={3}
              />
            )}
          </Skeleton>
        </Flex>
      </ScaleFade>
    </VStack>
  );
}

export default CountryPage;
