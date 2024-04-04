import React from "react";
import {Outlet} from 'react-router-dom';
import {Container, Flex} from "@chakra-ui/react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

const BaseLayout: React.FC = () => {
    return (
        <Flex minH={'100vh'} direction={'column'} justify={'space-between'}>
            <Container padding={'0 5vw 0 5vw'} maxW={'100%'}>
                <Header/>
                <Outlet/>
            </Container>
            <Footer/>
        </Flex>
    );
}

export default BaseLayout;
