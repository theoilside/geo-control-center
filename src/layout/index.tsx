import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

const BaseLayout: React.FC = () => {
  return (
    <Flex direction={"column"} justify={"space-between"} minH={"100vh"}>
      <Container padding={"0 5vw 0 5vw"} maxW={"100vw"}>
        <Header />
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  );
};

export default BaseLayout;
