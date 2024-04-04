import {Link} from 'react-router-dom';
import {Container, Flex, Heading, HStack, Image} from "@chakra-ui/react";
import {COUNTRIES_PAGE} from "../../routes/route-paths.ts";
import logo from '../../assets/images/logo.png';
import LoginButton from '../components/LoginButton';

function Header() {

    return (
        <Container padding={'30px 0 30px 0'} as={'header'} maxW={'100%'}>
            <Flex w={'100%'} wrap={'nowrap'} align={'center'} justifyContent={'space-between'}>
                <Link to={COUNTRIES_PAGE} style={{flexDirection: 'row'}}>
                    <HStack spacing={'3'} justify={'left'} flexGrow={'1'}>
                        <Image src={logo} boxSize={'30px'}/>
                        <Heading size={'md'} color={'orange.500'}>Geo Control Center</Heading>
                    </HStack>
                </Link>
                <LoginButton/>
            </Flex>
        </Container>
    )
}

export default Header;
