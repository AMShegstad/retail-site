import { 
  Container, 
  VStack, 
  Text, 
  SimpleGrid, 
  Box, 
  Image, 
  Heading, 
  HStack, 
  IconButton, 
  useColorModeValue, 
  useToast 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const { fetchProducts, products, deleteProduct } = useProductStore();
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container masW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <Box
              key={product._id}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
              bg={useColorModeValue("white", "gray.800")}
            >
              <Image
                src={product.imageURL}
                alt={product.name}
                h={48}
                w="full"
                objectFit="cover"
              />
              <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                  {product.name}
                </Heading>
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  color={useColorModeValue("gray.600", "gray.200")}
                  mb={4}
                >
                  ${product.price}
                </Text>
              </Box>
              <HStack spacing={2} p={4}>
                <IconButton icon={<FaEdit />} colorScheme="blue" />
                <IconButton
                  icon={<MdDelete />}
                  onClick={() => handleDeleteProduct(product._id)}
                  colorScheme="red"
                />
              </HStack>
            </Box>
          ))}
        </SimpleGrid>

        {products.length == 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No Products Found
            <br />
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Click to Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Home;
