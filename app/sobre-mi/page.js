"use client";

import { Container, Heading, Text, Box, VStack, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import FeaturedVideosWidget from "@/components/FeaturedVideosWidget";
import { getAllPosts } from "@/lib/blogData";

const ValueCard = ({ title, description, emoji }) => {
  return (
    <Box textAlign={"center"} p={6}>
      <Text fontSize={"5xl"} mb={4}>
        {emoji}
      </Text>
      <Heading fontSize={"xl"} mb={3} color="white">
        {title}
      </Heading>
      <Text color="dark.textSecondary">{description}</Text>
    </Box>
  );
};

export default function AboutPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero Section with Fishroom Background */}
      <Box
        position="relative"
        h={{ base: "400px", md: "500px" }}
        w="full"
        overflow="hidden"
        borderBottom="4px"
        borderColor="accent.cyan"
      >
        {/* Background Image */}
        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
          <Image
            src="/images/fishroom.jpg"
            alt="JuanJo El Tío Pez Fishroom"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-b, rgba(17, 25, 40, 0.3), rgba(17, 25, 40, 0.4))"
        />

        {/* Content */}
        <Container
          maxW="container.xl"
          h="full"
          position="relative"
          zIndex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={6} textAlign="center" maxW="3xl">
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              color="white"
              textShadow="2px 2px 4px rgba(0,0,0,0.6)"
            >
              Acerca de JuanJo El Tío Pez
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="white"
              textShadow="1px 1px 2px rgba(0,0,0,0.6)"
            >
              "Exploremos el fascinante mundo de la acuariofilia: peces, gambitas, consejos y toda
              la inspiración para tus proyectos acuáticos"
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW={"container.xl"} py={12}>
        <VStack spacing={8}>
          <Box
            bg="dark.surface"
            rounded={"lg"}
            p={8}
            border="1px"
            borderColor="dark.border"
            w="full"
          >
            <Heading fontSize={"2xl"} mb={4} color="accent.cyan">
              Nuestra misión
            </Heading>
            <Text fontSize={"lg"} mb={4} color="dark.text">
              En JuanJo El Tío Pez vivimos y respiramos acuariofilia. Nos encanta acompañarte en
              este hobby, ya sea que estés armando tu primer acuario de 40 litros o cuidando un
              plantado lleno de vida. Aquí encontrarás guía, apoyo y ese empujoncito que a todos nos
              hace falta cuando empezamos… y también cuando ya llevamos años en esto.
            </Text>
            <Text fontSize={"lg"} color="dark.text">
              Desde que nació este proyecto, la misión siempre ha sido la misma: promover una
              acuariofilia responsable. Queremos construir una comunidad grande y bonita, donde el
              amor por la vida sea lo primero. Si tenemos un pez, nos aseguramos de darle la mejor
              calidad de vida posible. Así de simple. Aquí compartimos tips, experiencias, productos
              que realmente sirven y todo lo necesario para que tus acuarios estén saludables y tus
              peces felices.
            </Text>
          </Box>

          <Box py={8} w="full">
            <Heading fontSize={"3xl"} textAlign={"center"} mb={10} color="white">
              ¿Qué representamos?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <ValueCard
                emoji={"❤️"}
                title={"Acuariofilia responsable"}
                description={
                  "Creemos que cada pez merece una vida digna, saludable y sin sufrimiento. Promovemos prácticas que respeten la vida y el bienestar de cada ser acuático."
                }
              />
              <ValueCard
                emoji={"📚"}
                title={"Educación"}
                description={
                  "Compartimos conocimientos prácticos, simples y aplicables. Nada de complicarse: explicamos lo que funciona, lo que no y por qué, para que cualquier persona pueda disfrutar un acuario vibrante."
                }
              />
              <ValueCard
                emoji={"🌱"}
                title={"Una comunidad unida"}
                description={
                  "No solo hablamos de acuarios: construimos un espacio donde todos aprendemos, compartimos y nos apoyamos. Una comunidad cercana donde la pasión por los peces nos conecta."
                }
              />
            </SimpleGrid>
          </Box>

          <Box
            bg="dark.surface"
            rounded={"lg"}
            p={8}
            border="1px"
            borderColor="dark.border"
            w="full"
          >
            <Heading fontSize={"2xl"} mb={4} color="white">
              ¿Qué encontrarás aquí?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Text fontWeight={"bold"} mb={2} color="white">
                  🐠 Cuidado Responsable de Peces
                </Text>
                <Text color="dark.textSecondary">
                  Recomendaciones claras para que tus peces tengan una vida larga, saludable y libre
                  de estrés.
                </Text>
              </Box>

              <Box>
                <Text fontWeight={"bold"} mb={2} color="white">
                  🧪 Resolución de Problemas
                </Text>
                <Text color="dark.textSecondary">
                  Guías prácticas para enfrentar algas, enfermedades, parámetros inestables y otros
                  retos del acuario.
                </Text>
              </Box>

              <Box>
                <Text fontWeight={"bold"} mb={2} color="white">
                  🎥 Contenido Educativo
                </Text>
                <Text color="dark.textSecondary">
                  Explicaciones fáciles, tips rápidos y demostraciones reales.
                </Text>
              </Box>

              <Box>
                <Text fontWeight={"bold"} mb={2} color="white">
                  🛠️ Recomendaciones de Equipos y Productos
                </Text>
                <Text color="dark.textSecondary">
                  Opiniones honestas sobre filtros, luces, plantas, sustratos y accesorios que
                  realmente funcionan.
                </Text>
              </Box>

              <Box>
                <Text fontWeight={"bold"} mb={2} color="white">
                  🌱 Mantenimiento de Acuarios Plantados
                </Text>
                <Text color="dark.textSecondary">
                  Rutinas, fertilización, poda y cuidados para mantener tus plantados vibrantes.
                </Text>
              </Box>

              <Box>
                <Text fontWeight={"bold"} mb={2} color="white">
                  🤝 Comunidad y Acompañamiento
                </Text>
                <Text color="dark.textSecondary">
                  Un espacio para resolver dudas y crecer juntos en el hobby.
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          <Box mt={12}>
            <FeaturedVideosWidget posts={posts} count={6} />
          </Box>
        </VStack>
      </Container>
    </>
  );
}
