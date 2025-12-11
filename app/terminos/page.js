"use client";

import { Container, Heading, Text, Box, VStack, Divider } from "@chakra-ui/react";

const Section = ({ title, children }) => (
  <Box mb={6}>
    <Heading size="md" color="accent.cyan" mb={3}>
      {title}
    </Heading>
    <Text color="dark.text" lineHeight="tall">
      {children}
    </Text>
  </Box>
);

export default function TerminosPage() {
  return (
    <Container maxW="container.md" py={12}>
      <VStack align="start" spacing={6}>
        <Box>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} color="white" mb={2}>
            Términos y Condiciones
          </Heading>
          <Text color="dark.textSecondary" fontSize="sm">
            Última actualización: Diciembre 2025
          </Text>
        </Box>

        <Divider borderColor="dark.border" />

        <Section title="1. Aceptación de los Términos">
          Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos y
          condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, por favor
          no utilices este sitio.
        </Section>

        <Section title="2. Propiedad Intelectual">
          Todo el contenido presente en este sitio web, incluyendo pero no limitado a textos,
          imágenes, videos, gráficos, logos y material audiovisual, es propiedad exclusiva de
          JuanJo El Tío Pez y está protegido por las leyes de derechos de autor. Todos los recursos
          publicados son de autoría propia y no pueden ser reproducidos, distribuidos o utilizados
          sin autorización expresa por escrito.
        </Section>

        <Section title="3. Uso del Contenido">
          El contenido de este sitio se proporciona únicamente con fines informativos y educativos
          sobre acuariofilia. Puedes compartir enlaces a nuestros artículos en redes sociales,
          siempre y cuando se mencione la fuente original. Queda prohibida la copia, reproducción o
          redistribución del contenido sin autorización.
        </Section>

        <Section title="4. Servicios de Asesoría">
          Los servicios de asesoría personalizada ofrecidos a través de este sitio están sujetos a
          disponibilidad y se proporcionan bajo acuerdo previo. Las recomendaciones ofrecidas se
          basan en la experiencia profesional, pero los resultados pueden variar según cada caso
          particular. El cliente es responsable de la implementación de las recomendaciones
          proporcionadas.
        </Section>

        <Section title="5. Limitación de Responsabilidad">
          La información proporcionada en este sitio web es de carácter general y no sustituye el
          asesoramiento profesional específico. JuanJo El Tío Pez no se hace responsable por
          cualquier daño directo o indirecto que pueda resultar del uso de la información
          proporcionada. Cada acuarista es responsable del cuidado de sus propios acuarios y
          mascotas.
        </Section>

        <Section title="6. Enlaces Externos">
          Este sitio puede contener enlaces a sitios web de terceros. No nos hacemos responsables
          del contenido, políticas de privacidad o prácticas de estos sitios externos. El acceso a
          dichos enlaces es bajo tu propio riesgo.
        </Section>

        <Section title="7. Privacidad">
          El uso de este sitio web está sujeto a nuestra Política de Privacidad. Al utilizar este
          sitio, aceptas el procesamiento de tus datos según lo descrito en dicha política.
          Respetamos tu privacidad y no compartimos información personal con terceros sin tu
          consentimiento.
        </Section>

        <Section title="8. Modificaciones">
          Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
          Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio
          web. Es tu responsabilidad revisar periódicamente estos términos para estar al tanto de
          cualquier cambio.
        </Section>

        <Section title="9. Ley Aplicable">
          Estos términos y condiciones se rigen por las leyes de Colombia. Cualquier disputa
          relacionada con estos términos será resuelta en los tribunales competentes de Colombia.
        </Section>

        <Section title="10. Contacto">
          Si tienes alguna pregunta sobre estos términos y condiciones, puedes contactarnos a través
          de:{" "}
          <Text as="span" color="accent.cyan" fontWeight="semibold">
            juanjoeltiopez@gmail.com
          </Text>{" "}
          o mediante nuestras redes sociales.
        </Section>
      </VStack>
    </Container>
  );
}
