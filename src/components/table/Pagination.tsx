import {Button, HStack, Text} from "@chakra-ui/react";

type PaginationProps = {
    currentPage: number;
    totalPages?: number;
    handlePrevPageClick: () => void;
    handleNextPageClick: () => void;
}

export function Pagination({...props}: PaginationProps) {
    return (
        <HStack>
            <Button
                onClick={props.handlePrevPageClick}
                size={"sm"}
                isDisabled={props.currentPage == 1}
            >
                ←
            </Button>
            <Text>
                Страница {props.currentPage} из {props.totalPages ?? '1'}
            </Text>
            <Button
                onClick={props.handleNextPageClick}
                size={"sm"}
                isDisabled={props.currentPage == (props.totalPages ?? 0)}
            >
                →
            </Button>
        </HStack>
    );
}
