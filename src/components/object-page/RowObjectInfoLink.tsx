import {Box, Heading, Link, Text} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

type RowObjectInfoLinkProps = {
    title: string;
    link?: string;
    content?: string;
}

export function RowObjectInfoLink({...props}: RowObjectInfoLinkProps) {
    return (
        <Box>
            <Heading size="xs" textTransform="uppercase">
                {props.title}
            </Heading>
            <Text pt="2" fontSize="sm">
                <Link
                    href={props.link}
                    color={"teal"}
                    isExternal
                >
                    {props.content}
                    <ExternalLinkIcon mx="4px" />
                </Link>
            </Text>
        </Box>
    )
}
