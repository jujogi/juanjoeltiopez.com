"use client";

import { Container, Heading, Text, Box, VStack, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getAllPosts } from "@/lib/blogData";
import AsesoriaWidget from "@/components/AsesoriaWidget";

// Import FeaturedVideosWidget dynamically with no SSR to avoid hydration issues
const FeaturedVideosWidget = dynamic(() => import("@/components/FeaturedVideosWidget"), {
  ssr: false,
});

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
    <Container maxW={"container.xl"} py={8}>
      <VStack spacing={8}>
        {/* Header Section */}
        <VStack align="start" spacing={4} w="full" mb={4}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} color="white">
            ¿Quién es JuanJo El Tío Pez?
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="dark.textSecondary">
            "Exploremos el fascinante mundo de la acuariofilia: peces, gambitas, consejos y toda la
            inspiración para tus proyectos acuáticos"
          </Text>
        </VStack>

        {/* Mission + Image Section */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
          {/* Image Card */}
          <Box
            bg="dark.surface"
            rounded={"lg"}
            overflow="hidden"
            border="1px"
            borderColor="dark.border"
            position="relative"
            h={{ base: "300px", md: "400px" }}
          >
            <Image
              src="/images/fishroom.jpg"
              alt="JuanJo El Tío Pez Fishroom"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>

          {/* Mission Text */}
          <Box
            bg="dark.surface"
            rounded={"lg"}
            p={8}
            border="1px"
            borderColor="dark.border"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Heading fontSize={"2xl"} mb={4} color="accent.cyan">
              Nuestra misión
            </Heading>
            <Text fontSize={"md"} mb={4} color="dark.text" lineHeight="tall">
              En JuanJo El Tío Pez vivimos y respiramos acuariofilia. Nos llena de felicidad cuando
              nuestros videos ayudan a que tus acuarios luzcan mejor o a que disfrutes más este
              hobby, ya sea que estés armando tu primer acuario o cuidando un plantado lleno de
              vida.
            </Text>
            <Text fontSize={"md"} color="dark.text" lineHeight="tall">
              Desde que nació este proyecto, la misión siempre ha sido la misma:{" "}
              <Text as="span" fontWeight="bold" color="accent.cyan">
                promover una acuariofilia responsable
              </Text>
              . Queremos construir la mejor comunidad acuarista, donde el amor por la vida sea lo
              primero.
            </Text>
          </Box>
        </SimpleGrid>

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
              title={"Comunidad"}
              description={
                "No solo hablamos de acuarios: construimos un espacio donde todos aprendemos, compartimos y nos apoyamos. Una comunidad cercana donde la pasión por los peces nos conecta."
              }
            />
          </SimpleGrid>
        </Box>

        <Box bg="dark.surface" rounded={"lg"} p={8} border="1px" borderColor="dark.border" w="full">
          <Heading fontSize={"2xl"} mb={4} color="white">
            ¿Qué encontrarás aquí?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box>
              <Text fontWeight={"bold"} mb={2} color="white">
                🐠 Cuidado responsable
              </Text>
              <Text color="dark.textSecondary">
                Las mejores recomendaciones para que tus peces, gambas, caracoles y plantas estén
                sanos.
              </Text>
            </Box>

            <Box>
              <Text fontWeight={"bold"} mb={2} color="white">
                🧪 Solución a problemas
              </Text>
              <Text color="dark.textSecondary">
                Guías prácticas para enfrentar algas, parámetros inestables y otros retos del
                acuario.
              </Text>
            </Box>

            <Box>
              <Text fontWeight={"bold"} mb={2} color="white">
                🎥 Contenido educativo
              </Text>
              <Text color="dark.textSecondary">
                Explicaciones sencillas, tips rápidos y demostraciones reales para aprender sin
                complicarte.
              </Text>
            </Box>

            <Box>
              <Text fontWeight={"bold"} mb={2} color="white">
                👀 Review de equipos y productos
              </Text>
              <Text color="dark.textSecondary">
                Opiniones honestas sobre filtros, luces, plantas, sustratos y accesorios que
                realmente funcionan.
              </Text>
            </Box>

            <Box>
              <Text fontWeight={"bold"} mb={2} color="white">
                🌱 Mantenimiento de acuarios plantados
              </Text>
              <Text color="dark.textSecondary">
                Rutinas, fertilización, poda y cuidados para mantener tus plantados.
              </Text>
            </Box>

            <Box>
              <Text fontWeight={"bold"} mb={2} color="white">
                🤝 Comunidad y acompañamiento
              </Text>
              <Text color="dark.textSecondary">
                Un espacio para resolver dudas y crecer juntos en el hobby.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box w="full">
          <AsesoriaWidget />
        </Box>

        <Box mt={12}>
          <FeaturedVideosWidget posts={posts} count={6} />
        </Box>
      </VStack>
    </Container>
  );
}
