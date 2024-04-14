import {Link, Td} from '@chakra-ui/react';
import {Link as ReactRouterLink} from "react-router-dom";

type TableCellProps = {
    data: string | number;
    maxWidthPx?: number;
    link?: {objectType: string, objectId: number, linkFunction: ((id: number) => string)};
}

function TableCell({...props}: TableCellProps) {
    if (!props.link)
        return (
            <Td
                isNumeric={typeof props.data === "number"}
                textOverflow={'ellipsis'}
                maxW={props.maxWidthPx ?? '500px'}
                whiteSpace={'nowrap'}
                overflow={'hidden'}
            >
                {props.data}
            </Td>
        );
    else
        return (
            <Td
                isNumeric={typeof props.data === "number"}
                textOverflow={'ellipsis'}
                maxW={props.maxWidthPx ?? '500px'}
                whiteSpace={'nowrap'}
                overflow={'hidden'}
            >
                <Link as={ReactRouterLink} to={props.link.linkFunction(props.link.objectId)} isExternal>
                    {props.link.objectId}
                </Link>
            </Td>
        );
}

export default TableCell;
