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
  //useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  //const { isOpen, onOpen } = useDisclosure();

  const { deleteProduct } = useProductStore();
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

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3 seconds"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      onClick={() => navigate(`/product/${product.id}`)}
      cursor="pointer"
    >
      <Image
        src={product.imageURL}
        alt={product.name}
        h={48}
        w="full"
        objectFit="fit"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontweight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.description}
        </Text>
      </Box>

      <Modal>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <HStack spacing={2}>
        <IconButton icon={<FaEdit />} colorScheme="blue" />
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
