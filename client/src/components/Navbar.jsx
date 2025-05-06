import { Container, Flex, Button, HStack, Text, useColorMode } from '@chakra-ui/react'; 
import { Link } from 'react-router-dom'
import { LuSquarePlus } from "react-icons/lu";
import { FcIdea, FcNoIdea } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return <Container maxW={"1140px"} px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}
        >
            <Text
                fontSize={{ base: "22", sm: "28"}}
                fontWeight={"bold"}
                textTransform={"uppsercase"}
                textAlign={"center"}
                bgGradient={"linear(to-l, #7928CA, #FF0080)"}
                bgClip={"text"}
            >
                
                <Link to={"/"}>Product Store <FaShoppingCart style={{ verticalAlign: "middle", marginLeft: "5px" }}/> </Link>
            </Text>
            
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <LuSquarePlus fontSize={20}/>
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <FcIdea size="20" color="gray.500"/> : <FcNoIdea size="20"/>}
                </Button>
            </HStack>
        </Flex>
    </Container>
}

export default Navbar;

