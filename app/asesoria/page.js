"use client";

import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  SimpleGrid,
  Grid,
  GridItem,
  List,
  ListItem,
  ListIcon,
  Button,
  Icon,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FaInstagram, FaVideo, FaClock, FaCheckCircle } from "react-icons/fa";
import RelatedPostsWidget from "@/components/RelatedPostsWidget";
import FeaturedVideosWidget from "@/components/FeaturedVideosWidget";
import { getAllPosts } from "@/lib/blogData";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Box textAlign="center" p={6}>
      <Icon as={icon} boxSize={12} color="accent.cyan" mb={4} />
      <Heading fontSize="lg" mb={3} color="white">
        {title}
      </Heading>
      <Text color="dark.textSecondary" fontSize="sm">
        {description}
      </Text>
    </Box>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <Box
      bg="dark.surface"
      rounded="lg"
      p={6}
      border="1px"
      borderColor="dark.border"
      position="relative"
    >
      <Box
        position="absolute"
        top="-15px"
        left="20px"
        bg="accent.cyan"
        color="dark.bg"
        rounded="full"
        w="30px"
        h="30px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
      >
        {number}
      </Box>
      <Heading fontSize="md" mb={2} color="white" mt={2}>
        {title}
      </Heading>
      <Text color="dark.textSecondary" fontSize="sm">
        {description}
      </Text>
    </Box>
  );
};

export default function AsesoriaPage() {
  const posts = getAllPosts();

  // Obtener artículos relacionados con cuidado y mantenimiento
  const relatedPosts = posts.slice(0, 3);

  return (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
        <GridItem>
          {/* Hero Section */}
          <VStack align="start" spacing={4} mb={12}>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} color="white">
              Asesoría Personalizada
            </Heading>
            <Text color="dark.textSecondary" fontSize="lg">
              ¿Necesitas ayuda específica con tu acuario? Te acompaño en cada paso para resolver tus
              dudas y alcanzar tus objetivos.
            </Text>
          </VStack>

          {/* Cuándo necesitas asesoría */}
          <Box bg="dark.surface" rounded="lg" p={8} border="1px" borderColor="dark.border" mb={8}>
            <Heading fontSize="2xl" mb={6} color="accent.cyan">
              ¿Cuándo necesitas asesoría personalizada?
            </Heading>
            <Text color="dark.text" mb={6}>
              El contenido que comparto en redes sociales y en esta página está diseñado para
              ayudarte con la mayoría de situaciones. Pero a veces, tu acuario tiene necesidades
              específicas que requieren atención personalizada.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <HStack spacing={2} mb={2}>
                  <Icon as={CheckCircleIcon} color="accent.cyan" />
                  <Text color="white" fontWeight="500">
                    Problemas persistentes
                  </Text>
                </HStack>
                <Text color="dark.textSecondary" fontSize="sm" pl={6}>
                  Algas que no logras controlar, peces enfermos, parámetros inestables
                </Text>
              </Box>

              <Box>
                <HStack spacing={2} mb={2}>
                  <Icon as={CheckCircleIcon} color="accent.cyan" />
                  <Text color="white" fontWeight="500">
                    Proyectos nuevos
                  </Text>
                </HStack>
                <Text color="dark.textSecondary" fontSize="sm" pl={6}>
                  Montar un plantado de cero, cambiar de acuario, diseñar un aquascape
                </Text>
              </Box>

              <Box>
                <HStack spacing={2} mb={2}>
                  <Icon as={CheckCircleIcon} color="accent.cyan" />
                  <Text color="white" fontWeight="500">
                    Dudas específicas
                  </Text>
                </HStack>
                <Text color="dark.textSecondary" fontSize="sm" pl={6}>
                  Compatibilidad de peces, equipamiento para tu caso particular
                </Text>
              </Box>

              <Box>
                <HStack spacing={2} mb={2}>
                  <Icon as={CheckCircleIcon} color="accent.cyan" />
                  <Text color="white" fontWeight="500">
                    Optimización
                  </Text>
                </HStack>
                <Text color="dark.textSecondary" fontSize="sm" pl={6}>
                  Mejorar tu rutina, reducir mantenimiento, potenciar crecimiento
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Cómo funciona */}
          <Box mb={8}>
            <Heading fontSize="2xl" mb={6} color="white" textAlign="center">
              ¿Cómo funciona?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <StepCard
                number="1"
                title="Contacta"
                description="Envíame un DM en Instagram explicando brevemente tu caso"
              />
              <StepCard
                number="2"
                title="Agenda"
                description="Coordinamos día y hora que nos funcione a ambos"
              />
              <StepCard
                number="3"
                title="Sesión"
                description="Nos conectamos virtualmente y trabajamos en tu acuario"
              />
            </SimpleGrid>
          </Box>

          {/* Qué incluye */}
          <Box bg="dark.surface" rounded="lg" p={8} border="1px" borderColor="dark.border" mb={8}>
            <Heading fontSize="2xl" mb={6} color="white">
              ¿Qué incluye la sesión?
            </Heading>
            <List spacing={4}>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Sesión virtual 1 a 1</strong> - Nos conectamos por videollamada para revisar
                tu caso específico
              </ListItem>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Análisis personalizado</strong> - Revisamos fotos, videos y parámetros de tu
                acuario
              </ListItem>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Plan de acción</strong> - Te entrego un plan paso a paso para resolver tu
                situación
              </ListItem>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Recomendaciones específicas</strong> - Productos, rutinas y ajustes para tu
                caso
              </ListItem>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Seguimiento</strong> - Dudas rápidas post-sesión vía mensaje durante 7 días
              </ListItem>
            </List>
          </Box>

          {/* Pricing Card */}
          <Box
            bg="gradient.card"
            bgGradient="linear(to-br, dark.surface, dark.bgAlt)"
            rounded="lg"
            p={8}
            border="2px"
            borderColor="accent.cyan"
            textAlign="center"
            mb={8}
          >
            <Heading fontSize="3xl" mb={2} color="white">
              $110.000 COP
            </Heading>
            <Text color="dark.textSecondary" mb={6}>
              por sesión virtual
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
              <FeatureCard
                icon={FaVideo}
                title="Virtual"
                description="Desde la comodidad de tu casa"
              />
              <FeatureCard
                icon={FaClock}
                title="60-90 min"
                description="Tiempo suficiente para resolver tus dudas"
              />
              <FeatureCard
                icon={FaCheckCircle}
                title="Seguimiento"
                description="7 días de soporte post-sesión"
              />
            </SimpleGrid>
            <Button
              as="a"
              href="https://www.instagram.com/juanjoeltiopez"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              bg="accent.cyan"
              color="white"
              leftIcon={<Icon as={FaInstagram} />}
              _hover={{ bg: "accent.cyanHover" }}
            >
              Agendar sesión por Instagram
            </Button>
          </Box>

          {/* FAQ */}
          <Box bg="dark.surface" rounded="lg" p={8} border="1px" borderColor="dark.border" mb={8}>
            <Heading fontSize="2xl" mb={6} color="white">
              Preguntas frecuentes
            </Heading>
            <Accordion allowToggle>
              <AccordionItem border="none" mb={4}>
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Cómo pago la sesión?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  Una vez confirmemos la cita por Instagram, te comparto los datos para
                  transferencia bancaria o Nequi. El pago se debe realizar antes de agendar la
                  sesión.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none" mb={4}>
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Qué plataforma usamos para la videollamada?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  Usualmente utilizamos Google Meet o Zoom. Si prefieres otra plataforma, podemos
                  coordinar.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none" mb={4}>
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Qué debo preparar antes de la sesión?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  Te recomiendo tener fotos y videos de tu acuario y los parámetros del agua si los
                  has medido. También es útil que anotes tus dudas principales.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none" mb={4}>
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Puedo grabar la sesión?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  ¡Claro! De hecho te lo recomiendo para que puedas revisar las recomendaciones
                  después.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Ofreces asesorías presenciales?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  Por el momento solo ofrezco sesiones virtuales. Esto me permite atender a
                  acuaristas de todo el país y mantener un precio accesible.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          {/* CTA Final */}
          <Box
            bg="dark.surface"
            rounded="lg"
            p={8}
            border="1px"
            borderColor="dark.border"
            textAlign="center"
          >
            <Heading fontSize="xl" mb={4} color="white">
              ¿Listo para llevar tu acuario al siguiente nivel?
            </Heading>
            <Text color="dark.textSecondary" mb={6}>
              Escríbeme por Instagram y hablemos sobre cómo puedo ayudarte
            </Text>
            <Button
              as="a"
              href="https://www.instagram.com/juanjoeltiopez"
              target="_blank"
              rel="noopener noreferrer"
              bg="accent.cyan"
              color="white"
              leftIcon={<Icon as={FaInstagram} />}
              _hover={{ bg: "accent.cyanHover" }}
            >
              Contactar por Instagram
            </Button>
          </Box>
        </GridItem>

        {/* Sidebar */}
        <GridItem display={{ base: "none", lg: "block" }}>
          <Box position="sticky" top={4}>
            <RelatedPostsWidget posts={relatedPosts} title="Artículos destacados" />
          </Box>
        </GridItem>
      </Grid>

      {/* Featured Videos Widget - 100% width */}
      <Box mt={12}>
        <FeaturedVideosWidget posts={posts} count={6} />
      </Box>
    </Container>
  );
}
