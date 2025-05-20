import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const NewUser = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  const toast = useToast();

  const handleAddUser = async () => {
    const userToSubmit = { ...newUser };

    try {
      const response = await fetch("/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fixed typo
        },
        body: JSON.stringify(userToSubmit),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the backend
        toast({
          title: "Error",
          description: data.message || "Failed to create user.",
          status: "error",
          isClosable: true,
        });
      } else {
        // Success
        toast({
          title: "Success",
          description: "User created successfully!",
          status: "success",
          isClosable: true,
        });

        // Reset the form
        setNewUser({
          email: "",
          password: "",
          username: "",
          name: "",
        });
      }
    } catch (error) {
      // Handle network or other errors
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        status: "error",
        isClosable: true,
      });
      console.error("Error creating user:", error);
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add New User
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
              placeholder="Email Address"
              name="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <Input
              placeholder="Username"
              name="username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <Input
              placeholder="Name"
              name="name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddUser} w="full">
              Add User
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default NewUser;