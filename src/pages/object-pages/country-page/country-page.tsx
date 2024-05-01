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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { COUNTRIES_PAGE } from "../../../routes/route-paths.ts";
import { countries } from "../../../mocks/countries.ts";
import ErrorPage from "../../error-page/error-page.tsx";
import { useGetCountryByIdApiCountryIdGet } from "../../../api/generated/reactQuery/country/country.ts";
import { useCountryId } from "../../../hooks/useCountryId.ts";
import { RowObjectInfo } from "../../../components/object-page/RowObjectInfo.tsx";
import { RowObjectInfoLink } from "../../../components/object-page/RowObjectInfoLink.tsx";
import Map from "../../../components/map/map.tsx";
import {HeaderWithAction} from "../../../components/object-page/HeaderWithActions.tsx";
import {formatDate} from "../../../components/formatDate.ts";

function CountryPage() {
  const countryIndex = useCountryId();
  const { data: country, isLoading } =
    useGetCountryByIdApiCountryIdGet(countryIndex);

  if (countryIndex < 0 || countryIndex >= countries.length) {
    return <ErrorPage />;
  }

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
            <HeaderWithAction title={country?.name} />
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <RowObjectInfo title={"Тип"} content={"Страна"} />
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
                <RowObjectInfo
                  title={"Телефонный код"}
                  content={country?.phone_code}
                />
                <RowObjectInfo
                    title={"Телефонная маска"}
                    content={country?.phone_mask}
                    tooltip={'. — любая цифра'}
                />
                <RowObjectInfoLink
                  title={"OSM (Nominatim)"}
                  link={`https://nominatim.openstreetmap.org/lookup?osm_ids=${country?.osm_type}${country?.osm_id}`}
                  content={`${country?.osm_type}${country?.osm_id}`}
                />
                <RowObjectInfo
                    title={"Последнее изменение"}
                    content={formatDate(country?.last_updated_at)}
                />
                <RowObjectInfo
                    title={"Удалено"}
                    content={country?.deleted_at as string}
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
