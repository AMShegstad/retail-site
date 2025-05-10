import React, { useEffect, useState } from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`); // Fetch product by ID
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <VStack spacing={4} align="center" p={4}>
      <Image
        src={product.imageURL}
        alt={product.name}
        boxSize="600px"
        objectFit="cover"
      />
      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          {product.name}
        </Text>
        <Text fontSize="xl" color="gray.600">
          ${product.price}
        </Text>
        <Text mt={2}>{product.description}</Text>
      </Box>
    </VStack>
  );
};

export default Product;