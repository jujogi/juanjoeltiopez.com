"use client";

import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  SimpleGrid,
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
import { FaWhatsapp, FaVideo, FaClock, FaCheckCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import ImageWithOverlay from "@/components/ImageWithOverlay";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { getAllPosts } from "@/lib/blogData";
import { getAllTestimonials } from "@/lib/testimonialsData";
import { trackCtaClick } from "@/lib/gtm";
import { getWhatsAppAsesoriaLink } from "@/lib/whatsappUtils";

// Import FeaturedVideosWidget dynamically with no SSR to avoid hydration issues
const FeaturedVideosWidget = dynamic(() => import("@/components/FeaturedVideosWidget"), {
  ssr: false,
});

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Box textAlign="center" p={{ base: 4, md: 6 }}>
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
      p={{ base: 4, md: 6 }}
      border="1px"
      borderColor="dark.border"
      position="relative"
    >
      <Box
        position="absolute"
        top="-15px"
        left="20px"
        bg="#25D366"
        color="white"
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
  const testimonials = getAllTestimonials();

  const handleAgendarSesionClick = () => {
    trackCtaClick("agendar_sesion_instagram");
  };

  const handleContactarClick = () => {
    trackCtaClick("contactar_instagram");
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        {/* Hero Section */}
          <VStack align="start" spacing={4} mb={12}>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} color="white" lineHeight="shorter">
              Asesoría personalizada para tu acuario plantado
            </Heading>
            <Text color="dark.text" fontSize={{ base: "lg", md: "xl" }} fontWeight="500">
              ¡Resuelve problemas persistentes, optimiza tu montaje y lleva tu acuario al siguiente nivel!
            </Text>
          </VStack>

          {/* Cuándo necesitas asesoría */}
          <Box bg="dark.surface" rounded="lg" p={{ base: 4, md: 6, lg: 8 }} border="1px" borderColor="dark.border" mb={8}>
            <Heading as="h2" fontSize="2xl" mb={6} color="accent.cyan">
              ¿Te identificas con alguna de estas situaciones?
            </Heading>
            <Text color="dark.text" mb={6}>
              El contenido gratuito que comparto en redes y en esta página resuelve muchos casos.
              Pero si tu acuario tiene problemas persistentes o necesitas una solución específica,
              una asesoría personalizada es la forma más rápida de obtener resultados.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <Box>
                <HStack spacing={2} mb={2} align="start">
                  <Icon as={CheckCircleIcon} color="accent.cyan" mt={1} flexShrink={0} />
                  <Box>
                    <Text color="white" fontWeight="600" mb={1}>
                      Problemas persistentes de algas
                    </Text>
                    <Text color="dark.textSecondary" fontSize="sm">
                      Algas filamentosas, verdes, negras o cianobacterias que vuelven a aparecer sin importar lo que hagas
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Box>
                <HStack spacing={2} mb={2} align="start">
                  <Icon as={CheckCircleIcon} color="accent.cyan" mt={1} flexShrink={0} />
                  <Box>
                    <Text color="white" fontWeight="600" mb={1}>
                      Plantas que no crecen o se mueren
                    </Text>
                    <Text color="dark.textSecondary" fontSize="sm">
                      Hojas amarillas, agujeros, crecimiento lento o plantas que se deshacen sin razón aparente
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Box>
                <HStack spacing={2} mb={2} align="start">
                  <Icon as={CheckCircleIcon} color="accent.cyan" mt={1} flexShrink={0} />
                  <Box>
                    <Text color="white" fontWeight="600" mb={1}>
                      Peces enfermos o estresados
                    </Text>
                    <Text color="dark.textSecondary" fontSize="sm">
                      Comportamiento anormal, pérdida de color, puntos blancos, o muertes inexplicables
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Box>
                <HStack spacing={2} mb={2} align="start">
                  <Icon as={CheckCircleIcon} color="accent.cyan" mt={1} flexShrink={0} />
                  <Box>
                    <Text color="white" fontWeight="600" mb={1}>
                      Parámetros inestables
                    </Text>
                    <Text color="dark.textSecondary" fontSize="sm">
                      pH que sube y baja, amonio o nitritos presentes, agua turbia constante
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Box>
                <HStack spacing={2} mb={2} align="start">
                  <Icon as={CheckCircleIcon} color="accent.cyan" mt={1} flexShrink={0} />
                  <Box>
                    <Text color="white" fontWeight="600" mb={1}>
                      Montar un acuario plantado desde cero
                    </Text>
                    <Text color="dark.textSecondary" fontSize="sm">
                      Quieres hacerlo bien desde el principio: hardscape, ciclado, plantas y peces
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Box>
                <HStack spacing={2} mb={2} align="start">
                  <Icon as={CheckCircleIcon} color="accent.cyan" mt={1} flexShrink={0} />
                  <Box>
                    <Text color="white" fontWeight="600" mb={1}>
                      Optimizar tu rutina de mantenimiento
                    </Text>
                    <Text color="dark.textSecondary" fontSize="sm">
                      Pasas mucho tiempo en mantenimiento o sientes que podrías estar haciendo las cosas mejor
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Cómo funciona */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" mb={2} color="white" textAlign="center">
              ¿Cómo funciona la asesoría?
            </Heading>
            <Text color="dark.textSecondary" textAlign="center" mb={6} maxW="2xl" mx="auto">
             En 3 pasos tendrás un plan para resolver tu situación.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <StepCard
                number="1"
                title="Contáctame por WhatsApp"
                description="Cuéntame brevemente cuál es tu situación y qué necesitas resolver"
              />
              <StepCard
                number="2"
                title="Agendamos la sesión"
                description="Coordinamos día y hora. Una vez confirmado el pago, recibes el link de la videollamada"
              />
              <StepCard
                number="3"
                title="Sesión virtual 1 a 1"
                description="60-80 minutos analizando tu caso y creando un plan de acción único para ti"
              />
            </SimpleGrid>
          </Box>

          {/* Qué incluye */}
          <Box bg="dark.surface" rounded="lg" p={{ base: 4, md: 6, lg: 8 }} border="1px" borderColor="dark.border" mb={8}>
            <Heading as="h2" fontSize="2xl" mb={2} color="white">
              Qué incluye tu sesión de asesoría
            </Heading>
            <Text color="dark.textSecondary" mb={6}>
              No es solo una videollamada. Es una sesión completa de diagnóstico, planificación y seguimiento.
            </Text>
            <List spacing={5}>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Sesión virtual 1 a 1 de 60-80 minutos</strong> - Videollamada donde revisamos tu caso a fondo
              </ListItem>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Diagnóstico completo de tu acuario</strong> - Analizamos fotos, videos, parámetros del agua y tu rutina actual para identificar la raíz del problema
              </ListItem>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Plan de acción personalizado paso a paso</strong> - Te entrego un plan específico con acciones concretas
              </ListItem>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Recomendaciones de productos y equipamiento</strong> - Sugerencias específicas adaptadas a tu presupuesto y disponibilidad en Colombia
              </ListItem>
              <ListItem color="dark.text">
                <ListIcon as={FaCheckCircle} color="accent.cyan" />
                <strong>Grabación de la sesión (opcional)</strong> - Puedes grabar la videollamada para revisarla cuando necesites recordar algo
              </ListItem>
            </List>
          </Box>

          {/* Qué vas a lograr */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" mb={2} color="white" textAlign="center">
              Qué vas a lograr con la asesoría
            </Heading>
            <Text color="dark.textSecondary" textAlign="center" mb={8} maxW="2xl" mx="auto">
              Al final de la sesión, tendrás claridad total sobre qué está pasando con tu acuario y exactamente qué hacer para resolverlo.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              <Box bg="dark.surface" p={6} rounded="lg" border="1px" borderColor="dark.border" textAlign="center">
                <Text fontSize="3xl" mb={2}>🎯</Text>
                <Heading fontSize="md" mb={2} color="white">
                  Diagnóstico preciso
                </Heading>
                <Text fontSize="sm" color="dark.textSecondary">
                  Sabrás exactamente qué está causando tus problemas
                </Text>
              </Box>
              <Box bg="dark.surface" p={6} rounded="lg" border="1px" borderColor="dark.border" textAlign="center">
                <Text fontSize="3xl" mb={2}>📋</Text>
                <Heading fontSize="md" mb={2} color="white">
                  Plan de acción
                </Heading>
                <Text fontSize="sm" color="dark.textSecondary">
                  Pasos concretos ordenados por prioridad
                </Text>
              </Box>
              <Box bg="dark.surface" p={6} rounded="lg" border="1px" borderColor="dark.border" textAlign="center">
                <Text fontSize="3xl" mb={2}>⏱️</Text>
                <Heading fontSize="md" mb={2} color="white">
                  Ahorro de tiempo
                </Heading>
                <Text fontSize="sm" color="dark.textSecondary">
                  Evita meses de prueba y error buscando soluciones
                </Text>
              </Box>
              <Box bg="dark.surface" p={6} rounded="lg" border="1px" borderColor="dark.border" textAlign="center">
                <Text fontSize="3xl" mb={2}>💰</Text>
                <Heading fontSize="md" mb={2} color="white">
                  Ahorro de dinero
                </Heading>
                <Text fontSize="sm" color="dark.textSecondary">
                  Deja de comprar productos que tal vez no necesitas
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Pricing Card */}
          <Box
            bg="gradient.card"
            bgGradient="linear(to-br, dark.surface, dark.bgAlt)"
            rounded="lg"
            p={{ base: 4, md: 6, lg: 8 }}
            border="2px"
            borderColor="accent.cyan"
            textAlign="center"
            mb={8}
            position="relative"
          >
            <Heading as="h2" fontSize="xl" mb={4} color="white">
              Inversión en tu asesoría personalizada
            </Heading>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} mb={2} color="accent.cyan">
              $130.000 COP
            </Heading>
            <Text color="dark.textSecondary" mb={2} fontSize="lg">
              por sesión virtual
            </Text>
            <Text color="dark.text" fontSize="sm" mb={6} maxW="md" mx="auto">
              Pago único. Incluye 7 días de seguimiento.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
              <FeatureCard
                icon={FaVideo}
                title="100% Virtual"
                description="Desde cualquier parte de Colombia o el mundo"
              />
              <FeatureCard
                icon={FaClock}
                title="60-80 minutos"
                description="Sesión completa sin apuros"
              />
              <FeatureCard
                icon={FaCheckCircle}
                title="Seguimiento incluido"
                description="7 días de soporte vía WhatsApp"
              />
            </SimpleGrid>
            <Button
              as="a"
              href={getWhatsAppAsesoriaLink()}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              bg="#25D366"
              color="white"
              leftIcon={<Icon as={FaWhatsapp} />}
              _hover={{ bg: "#128C7E" }}
              onClick={handleAgendarSesionClick}
              whiteSpace="normal"
              height="auto"
              py={3}
            >
              Agenda tu sesión ahora
            </Button>
          </Box>

          {/* Testimonials Carousel */}
          <Box mb={8}>
            <TestimonialsCarousel testimonials={testimonials} />
          </Box>

          {/* Garantía */}
          <Box
            bg="dark.surface"
            rounded="lg"
            p={{ base: 4, md: 6, lg: 8 }}
            border="2px"
            borderColor="accent.cyan"
            textAlign="center"
            mb={8}
          >
            <Text fontSize="3xl" mb={3}>✓</Text>
            <Heading as="h2" fontSize="xl" mb={3} color="white">
              Mi compromiso contigo
            </Heading>
            <Text color="dark.text" maxW="2xl" mx="auto">
              Si al finalizar la sesión sientes que no aprendiste nada nuevo, te devuelvo tu dinero.
              Sin preguntas, sin complicaciones. Mi reputación se basa en resultados reales,
              y quiero que te sientas 100% seguro al agendar.
            </Text>
          </Box>

          {/* FAQ */}
          <Box
            mt={8}
            bg="dark.surface"
            rounded="lg"
            p={{ base: 4, md: 6, lg: 8 }}
            border="1px"
            borderColor="dark.border"
            mb={8}
          >
            <Heading as="h2" fontSize="2xl" mb={6} color="white">
              Preguntas frecuentes
            </Heading>
            <Accordion allowToggle>
              <AccordionItem border="none" mb={4}>
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Una sesión es suficiente para resolver mi problema?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  En la mayoría de casos, sí. Una sesión es suficiente para hacer un diagnóstico completo
                  y entregarte un plan de acción que puedes implementar por tu cuenta. El seguimiento de 7 días
                  está incluido para resolver dudas durante la implementación. Si después necesitas una segunda
                  sesión de seguimiento, podemos coordinarla.
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
                  Te recomiendo tener: (1) Fotos y videos recientes de tu acuario desde diferentes ángulos,
                  (2) Parámetros del agua si los has medido (pH, GH, KH, NO3, PO4, etc.), (3) Lista de equipamiento
                  que usas (filtro, luz, CO2, abonos), (4) Tus dudas o problemas principales anotados.
                  No te preocupes si no tienes todo, trabajaremos con lo que tengas disponible.
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
                  coordinar. Te envío el link de la videollamada una vez confirmado el pago.
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
                  ¡Sí! De hecho te lo recomiendo. Así puedes revisar las recomendaciones después
                  sin tener que tomar notas durante toda la sesión. La mayoría de plataformas de
                  videollamada tienen opción de grabación integrada.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none" mb={4}>
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Cómo realizo el pago?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  Una vez nos contactemos por WhatsApp y confirmemos día y hora, te comparto los datos
                  para transferencia bancaria o Nequi. El pago se realiza antes de la sesión. Una vez
                  confirmado, recibes el link de la videollamada.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none" mb={4}>
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Ofreces asesorías presenciales?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  Por el momento solo ofrezco sesiones virtuales. Esto me permite atender a
                  acuaristas de todo el país (y otros países) sin limitaciones geográficas,
                  y mantener un precio accesible para todos.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <AccordionButton bg="dark.bgAlt" _hover={{ bg: "dark.border" }} rounded="md" p={4}>
                  <Box flex="1" textAlign="left" color="white" fontWeight="500">
                    ¿Qué pasa si no puedo asistir a la sesión agendada?
                  </Box>
                  <AccordionIcon color="accent.cyan" />
                </AccordionButton>
                <AccordionPanel pb={4} color="dark.textSecondary">
                  Si necesitas cancelar o reprogramar, avísame con al menos 24 horas de anticipación
                  y coordinamos una nueva fecha sin problema. Si no te presentas a la sesión sin avisar,
                  no hay reembolso ni reprogramación.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>


          {/* Inspirational Image Section */}
          <ImageWithOverlay
            imageSrc="/images/acuarios-plantados.jpg"
            alt="Acuario plantado en equilibrio"
            description="Un acuario en equilibrio puede ser una fuente de tranquilidad, belleza y conexión con la naturaleza. ¡Vamos a crear ese espacio único que tanto deseas!"
          />

          {/* CTA Final */}
          <Box
            bg="gradient.card"
            bgGradient="linear(to-br, dark.surface, dark.bgAlt)"
            rounded="lg"
            p={{ base: 4, md: 6, lg: 8 }}
            border="2px"
            borderColor="accent.cyan"
            textAlign="center"
            mt={4}
          >
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} color="white">
              ¿Listo para resolver el problema de tu acuario?
            </Heading>
            <Text color="dark.text" mb={2} fontSize={{ base: "md", md: "lg" }}>
              Deja de buscar soluciones genéricas en internet
            </Text>
            <Text color="dark.textSecondary" mb={6} maxW="xl" mx="auto">
              Agenda tu sesión personalizada y obtén un diagnóstico preciso + plan de acción específico para tu caso
            </Text>
            <Button
              as="a"
              href={getWhatsAppAsesoriaLink()}
              target="_blank"
              rel="noopener noreferrer"
              bg="#25D366"
              color="white"
              size="lg"
              leftIcon={<Icon as={FaWhatsapp} />}
              _hover={{ bg: "#128C7E", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              onClick={handleContactarClick}
              whiteSpace="normal"
              height="auto"
              py={3}
            >
              Agenda tu sesión ahora
            </Button>
            <Text fontSize="xs" color="dark.textSecondary" mt={3}>
              Cupos limitados por mes para mantener la calidad del servicio
            </Text>
          </Box>
        </Box>

        {/* Featured Videos Widget - 100% width */}
        <Box mt={12}>
          <FeaturedVideosWidget posts={posts} count={6} />
        </Box>
    </Container>
  );
}
