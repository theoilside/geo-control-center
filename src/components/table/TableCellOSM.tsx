import {Link, Td} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

type TableCellOSMProps = {
    osmIdValue: string;
}

function TableCellOSM({...props}: TableCellOSMProps) {
    return (
        <Td width={'100vw'}>
            <Link href={`https://openstreetmap.org/relation/${props.osmIdValue}`} color={'teal'} isExternal>
                {props.osmIdValue}<ExternalLinkIcon mx='4px' />
            </Link>
        </Td>
    );
}

export default TableCellOSM;
