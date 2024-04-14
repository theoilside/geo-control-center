import {Tr} from '@chakra-ui/react'
import TableCellID from "./TableCellID.tsx";
import TableCell from "./TableCell.tsx";
import TableCellOSM from "./TableCellOSM.tsx";

type TableRowProps = {
    objectData: {
        id: number,
        linkFunction: ((id: number) => string),
        otherData: {
            data: number | string,
            linkObject?: {
                objectType: string,
                objectId: number,
                linkFunction: ((id: number) => string)
            }
        }[]
        objectOSMData?: {
            osmID: string,
        }
    }
    maxCellWidthPx?: number,
    isDeleted?: boolean,
}
function TableRow({...props}: TableRowProps) {
    return (
        <Tr width={'100%'} backgroundColor={props.isDeleted ? '#e7e3e3' : 'white'}>
            <TableCellID idValue={props.objectData.id} linkFunction={props.objectData.linkFunction} />
            {props.objectData.otherData.map((data) => (
                <TableCell
                    data={data.data}
                    maxWidthPx={props.maxCellWidthPx}
                />
            ))}
            {props.objectData.objectOSMData &&
                <TableCellOSM osmIdValue={props.objectData.objectOSMData.osmID}/>
            }
        </Tr>
    );
}

export default TableRow;
