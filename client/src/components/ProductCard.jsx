import React from "react";
import {
  Text,
  IconButton,
  Box,
  Image,
  useColorModeValue,
  Heading,
  HStack,
  useToast,
  Modal,
  VStack,
  //useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  ModalFooter, 
  Input,
  Button
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

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
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  //const {deleteProduct, updatedProduct} = useProductStore()
  const handleUpdateProduct = async (pid, updatedProduct) => {
    await updateProduct(pid, updatedProduct);
    onClose();
  }

  // Debugging
  //console.log(product);
  console.log("product.description = ", product.description);
  console.log("product.name = ", product.name);
  console.log("product.imageURL = ", product.imageURL);

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3 seconds"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.imageURL}
        alt={product.name}
        h={64}
        w="full"
        objectFit="contain"
      />
      <Box p={4} onClick={() => navigate(`/product/${product.id}`)} cursor="pointer">
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product.price}
        </Text>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product.description || "No description available"}
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <Input placeholder='Product Name' name='name' value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}/>
                <Input placeholder='Price' name='price' type='number' value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}/>
                <Input placeholder='Image URL' name='image' value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}/>
              </VStack>
              </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                Update
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <HStack spacing={2}>
        {/*This is the "edit" button */}
        <IconButton icon={<FaEdit />} colorScheme="blue" onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}/>
        <IconButton
          icon={<MdDelete />}
          onClick={() => handleDeleteProduct(product._id)}
          colorScheme="red"
        />
      </HStack>
    </Box>
  );
};

export default ProductCard;
