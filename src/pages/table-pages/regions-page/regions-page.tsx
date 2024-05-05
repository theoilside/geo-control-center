import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Flex,
  IconButton,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import TabsMenu from "../../../components/tabs-menu/TabsMenu.tsx";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import TableHeader from "../../../components/table/TableHeader.tsx";
import {getRegionPagePathById} from "../../../routes/routes.ts";
import { useCallback, useState } from "react";
import { ROWS_PER_PAGE } from "../../../settings.ts";
import { formatDate } from "../../../components/formatDate.ts";
import { Pagination } from "../../../components/table/Pagination.tsx";
import { NotFound } from "../../../components/table/NotFound.tsx";
import {useSearchRegionsApiRegionGet} from "../../../api/generated/reactQuery/region/region.ts";

function RegionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isDeletedIncluded, setIsDeletedIncluded] = useState(false);

  const { data: regionsPage, isLoading } = useSearchRegionsApiRegionGet({
    page_number: currentPage,
    page_size: ROWS_PER_PAGE,
    term: searchTerm,
  });

  const handleNextPageClick = useCallback(() => {
    const current = currentPage;
    const next = current + 1;
    const total = regionsPage?.pagination.total_pages ?? 1;
    setCurrentPage(next <= total ? next : current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePrevPageClick = useCallback(() => {
    const current = currentPage;
    const prev = current - 1;
    setCurrentPage(prev > 0 ? prev : current);
  }, [currentPage]);

  const handleDeletedIncluded = () => {
    setIsDeletedIncluded(!isDeletedIncluded);
  };

  function getFilteredObjects(isDeletedIncluded: boolean) {
    return regionsPage?.data.filter((region) => {
      // if (region.deleted_at) (true) {
      // eslint-disable-next-line no-constant-condition
      if (1 < 0) {
        if (isDeletedIncluded) return region;
        return;
      }
      return region;
    });
  }

  const navigate = useNavigate();

  return (
      <>
        <VStack spacing={"30px"}>
          <TabsMenu selectedTabIndex={1} />
          <TableHeader
              isEditingAvailable={true}
              isSearchAvailable={true}
              isMapAvailable={false}
              onDeletedFlagChange={handleDeletedIncluded}
              getObjectPagePathById={getRegionPagePathById}
              handleSearch={(term: string | null) => setSearchTerm(term)}
          />
          <Flex width={"100%"} direction={"column"} gap={"15px"}>
            <Skeleton isLoaded={!isLoading}>
              <TableContainer>
                {getFilteredObjects(isDeletedIncluded)?.length == 0 ? (
                    <NotFound />
                ) : (
                    <Table
                        variant="simple"
                        style={{ tableLayout: "auto", width: "100%" }}
                        css={{
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "#8ccef0",
                            borderRadius: "24px",
                          },
                        }}
                    >
                      <Thead>
                        <Tr>
                          <Th
                              position={"sticky"}
                              left={"0"}
                              backgroundColor={"#edf2f7"}
                              isNumeric
                          >
                            {""}
                          </Th>
                          <Th>Название</Th>
                          <Th>Страна</Th>
                          <Th isNumeric>Широта</Th>
                          <Th isNumeric>Долгота</Th>
                          <Th>OSM</Th>
                          <Th>Изменено</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {getFilteredObjects(isDeletedIncluded)?.map((region) => (
                            <Tr
                                width={"100%"}
                                // backgroundColor={
                                //   region.deleted_at ? "#f7eded" : "white"
                                // }
                            >
                              <Td
                                  color={"orange.700"}
                                  position={"sticky"}
                                  left={"0"}
                                  backgroundColor={"#edf2f7"}
                                  isNumeric
                              >
                                <Flex width={"60px"} justifyContent={"space-between"}>
                                  <Link
                                      as={ReactRouterLink}
                                      to={getRegionPagePathById(region.id)}
                                      style={{ lineHeight: "24px" }}
                                      isExternal
                                  >
                                    {region.id}
                                  </Link>
                                  <IconButton
                                      aria-label={"Перейти"}
                                      icon={<ArrowForwardIcon />}
                                      size={"xs"}
                                      colorScheme="orange"
                                      isRound={true}
                                      onClick={() =>
                                          navigate(getRegionPagePathById(region.id))
                                      }
                                  />
                                </Flex>
                              </Td>
                              <Td>{region.name}</Td>
                              <Td>{region.country_id}</Td>
                              <Td>{region.latitude}</Td>
                              <Td>{region.longitude}</Td>
                              <Td>
                                <Link
                                    href={`https://nominatim.openstreetmap.org/ui/details.html?osmtype=${region?.osm_type}&osmid=${region?.osm_id}`}
                                    color={"teal"}
                                    isExternal
                                >
                                  {region.osm_type}
                                  {region.osm_id}
                                  <ExternalLinkIcon mx="4px" />
                                </Link>
                              </Td>
                              <Td width={"100vw"}>
                                {formatDate(region.last_updated_at)}
                              </Td>
                            </Tr>
                        ))}
                      </Tbody>
                    </Table>
                )}
              </TableContainer>
            </Skeleton>
            {regionsPage && regionsPage.pagination.total_pages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={regionsPage?.pagination.total_pages}
                    handleNextPageClick={handleNextPageClick}
                    handlePrevPageClick={handlePrevPageClick}
                />
            )}
          </Flex>
        </VStack>
      </>
  );
}

export default RegionsPage;
