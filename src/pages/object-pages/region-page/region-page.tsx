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
import {REGIONS_PAGE} from "../../../routes/route-paths.ts";
import ErrorPage from "../../error-page/error-page.tsx";
import { useObjectId } from "../../../hooks/useObjectId.ts";
import { RowObjectInfo } from "../../../components/object-page/RowObjectInfo.tsx";
import { RowObjectInfoLink } from "../../../components/object-page/RowObjectInfoLink.tsx";
import Map from "../../../components/map/map.tsx";
import {HeaderWithAction} from "../../../components/object-page/HeaderWithActions.tsx";
import {formatDate} from "../../../components/formatDate.ts";
import {timeSince} from "../../../components/timeSince.ts";
import {useGetRegionByIdApiRegionIdGet} from "../../../api/generated/reactQuery/region/region.ts";

function RegionPage() {
    const regionIndex = useObjectId();
    const { data: region, isLoading, refetch, error } =
        useGetRegionByIdApiRegionIdGet(regionIndex);
    if (error) {
        return <ErrorPage />;
    }

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
                    <Card variant={"outline"} flexGrow={1}>
                        <HeaderWithAction
                            title={region?.name}
                            objectType={'Регион'}
                            isAutoUpdatable={region?.need_automatic_update}
                            // deletedAt={formatDate(region?.deleted_at as string)}
                            // deletedAgo={timeSince(region?.deleted_at as string)}
                            lastEditedAt={formatDate(region?.last_updated_at)}
                            lastEditedAgo={timeSince(region?.last_updated_at)}
                            refetchFunction={refetch} />
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                <RowObjectInfo
                                    title={"Страна"}
                                    content={region?.country_id}
                                />
                                <RowObjectInfoLink
                                    title={"OSM (Nominatim)"}
                                    link={`https://nominatim.openstreetmap.org/ui/details.html?osmtype=${region?.osm_type}&osmid=${region?.osm_id}`}
                                    content={`${region?.osm_type}${region?.osm_id}`}
                                />
                            </Stack>
                        </CardBody>
                    </Card>
                    <Skeleton isLoaded={!isLoading || region !== undefined}>
                        {region && (
                            <Map
                                pointGeometry={{
                                    lat: region.latitude,
                                    lon: region.longitude,
                                }}
                                pointName={region.name}
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

export default RegionPage;
