import React from 'react'
import { Text, IconButton, Box, Image, useColorModeValue, Heading, HStack } from '@chakra-ui/react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600, gray.200");
    const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3 seconds'
        _hover= {{ transform: "translateY(-5px)", shadow: 'xl' }}
        bg={bg}
    >
        <Image  src={product.imageURL} alt={product.name} h={48} w='full' objectFit='cover'/>
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>
            <Text fontweight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>
        </Box>
        <HStack spacing={2}>
            <IconButton icon={<FaEdit />} colorScheme='blue' />
            <IconButton icon={<MdDelete />} colorScheme='red' />
        </HStack>
    </Box>
  )
}

export default ProductCard