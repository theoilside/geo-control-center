import { Container, VStack, Text, Divider, Stack, Button } from '@chakra-ui/react';

function Footer() {
    return (
        <Container
            padding="30px 5vw 2vh 5vw"
            as="footer"
            role="contentinfo"
            maxWidth={'100%'}
        >
            <VStack spacing={'2'}>
                <Divider opacity={'1'} borderWidth={'1px'} />
                <Stack
                    direction={'row'}
                    justify={'space-between'}
                    width={'100%'}
                    align={'center'}
                >
                    <Button size={'xs'}>
                        Документация API
                    </Button>
                    <Text fontSize="sm" color="custom.blue.200">
                        Geo Control Center, {new Date().getFullYear()} &copy;
                    </Text>
                </Stack>
            </VStack>
        </Container>
    );
}

export default Footer;
