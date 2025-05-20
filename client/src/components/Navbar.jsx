import { Container, Flex, Button, HStack, Text, useColorMode } from '@chakra-ui/react'; 
import { Link } from 'react-router-dom'
import { LuSquarePlus } from "react-icons/lu";
import { FcIdea, FcNoIdea } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    let loggedIn = false;

    const loggedInButtons = () => (
        <>
            <Link to={"/create"}>
                <Button>
                    <LuSquarePlus fontSize={20}/>
                </Button>
            </Link>
            <Link to={"/addUser"}>
                <Button>
                    <IoMdPersonAdd />
                </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FcIdea size="20" color="gray.500"/> : <FcNoIdea size="20"/>}
            </Button>
        </>
    )
    
    const guestButtons = () => (
        <>
            <Link to={"/login"}>
                <Button>
                    <RiLoginCircleLine />
                </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FcIdea size="20" color="gray.500"/> : <FcNoIdea size="20"/>}
            </Button>
        </>
    )

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
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-l, #7928CA, #FF0080)"}
                bgClip={"text"}
            >
                
                <Link to={"/"}>Shegstad Engraving & Printing <FaShoppingCart style={{ verticalAlign: "middle", marginLeft: "5px" }}/> </Link>
            </Text>
            
            <HStack spacing={2} alignItems={"center"}>
                {loggedIn ? loggedInButtons() : guestButtons()}
            </HStack>
        </Flex>
    </Container>
}

export default Navbar;

