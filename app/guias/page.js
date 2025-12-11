"use client";

import {
  Badge,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const GuideCard = ({ title, description, topics, emoji, status, badgeColor }) => {
  return (
    <Box
      bg="dark.surface"
      rounded={"lg"}
      p={6}
      border="1px"
      borderColor="dark.border"
      _hover={{
        borderColor: "accent.cyan",
        transform: "translateY(-4px)",
        transition: "all 0.3s",
      }}
    >
      <Box display="flex" alignItems={"start"} justifyContent={"space-between"}>
        <Text fontSize={"4xl"} mb={4}>
          {emoji}
        </Text>
        <Badge colorScheme={badgeColor} fontSize="9px">
          {status}
        </Badge>
      </Box>

      <Heading fontSize={"xl"} mb={3} color="white">
        {title}
      </Heading>
      <Text color="dark.textSecondary" mb={4}>
        {description}
      </Text>
      <List spacing={2}>
        {topics.map((topic, index) => (
          <ListItem key={index} fontSize={"sm"} color="dark.text">
            <ListIcon as={CheckCircleIcon} color={"accent.cyan"} />
            {topic}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default function GuidesPage() {
  const guides = [
    {
      title: "Acuarios de agua dulce",
      description: "Todo lo que necesitas para comenzar tu primer acuario",
      emoji: "🐠",
      status: "En desarrollo",
      badgeColor: "green",
      topics: [
        "Proceso de ciclado del acuario",
        "Elegir el equipamento correcto",
        "Peces ideales para principiantes",
        "Rutina de mantenimiento semanal",
      ],
    },
    {
      title: "Acuarios Plantados",
      description: "Crea un jardín acuático",
      emoji: "🌿",
      status: "En desarrollo",
      badgeColor: "green",
      topics: [
        "Selección de sustrato",
        "Iluminación",
        "Inyección de CO2",
        "Plantas acuáticas",
        "Dosificación de nutrientes",
      ],
    },
    {
      title: "Química del agua",
      description: "Conoce cuales son los parámetros más importantes",
      emoji: "⚗️",
      status: "Próximamente",
      badgeColor: "blue",
      topics: ["pH y dureza", "Ciclo del nitrógeno", "Pruebas y monitoreo", "Cambios de aguaa"],
    },
    {
      title: "Salud en tus peces",
      description: "Mantén tus peces libres de enfermedades",
      emoji: "🏥",
      status: "Próximamente",
      badgeColor: "blue",
      topics: [
        "Enfermedades comunes y tratamiento",
        "La importancia de la cuarentena",
        "Nutrición y alimentación",
        "Manejo del estrés",
      ],
    },
    {
      title: "Aquascaping",
      description: "Diseña obras de arte bajo el agua",
      emoji: "🎨",
      status: "Próximamente",
      badgeColor: "blue",
      topics: [
        "Principios y estilos de diseño",
        "Disposición de hardscape",
        "Selección y ubicación de plantas",
        "Algas",
        "Mantenimiento y poda",
      ],
    },
  ];

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={4} mb={10} align="start">
        <Heading fontSize={"4xl"} color="white">
          Guías
        </Heading>
        <Text color="dark.textSecondary" fontSize={"lg"}>
          Guías completas para ayudarte a tener éxito en este hobby
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {guides.map((guide, index) => (
          <GuideCard key={index} {...guide} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
