import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Button,
  Input
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const Create = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageURL: "",
  });

  const {createProduct} = useProductStore()
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct)
    console.log("Success: ", success)
    console.log("Message: ", message)
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Add New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("gray.200", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="imageURL"
              value={newProduct.imageURL}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageURL: e.target.value })
              }
            />
            <Button colorScheme='blue' onClick={handleAddProduct} w="full"></Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
)};

export default Create;
