"use client";

import { useState } from "react";
import { Box, Heading, Text, VStack, HStack, IconButton, SimpleGrid, Icon } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const TestimonialCard = ({ testimonial }) => {
  return (
    <Box
      bg="dark.surface"
      rounded="lg"
      p={{ base: 4, md: 6 }}
      border="1px"
      borderColor="dark.border"
      position="relative"
      h="full"
    >
      <Icon
        as={FaQuoteLeft}
        position="absolute"
        top={4}
        right={4}
        boxSize={8}
        color="accent.cyan"
        opacity={0.2}
      />

      <VStack align="start" spacing={4} h="full">
        {/* Rating */}
        <HStack spacing={1}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <Icon key={i} as={FaStar} color="accent.cyan" boxSize={4} />
          ))}
        </HStack>

        {/* Testimonial Text */}
        <Text color="dark.text" fontSize="sm" lineHeight="tall" flex={1}>
          {testimonial.text}
        </Text>

        {/* Author Info */}
        <Box pt={2} borderTop="1px" borderColor="dark.border" w="full">
          <Text color="white" fontWeight="600" fontSize="sm">
            {testimonial.name}
          </Text>
          <Text color="dark.textSecondary" fontSize="xs">
            {testimonial.location}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default function TestimonialsCarousel({ testimonials }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Agrupar testimonios en pares (2 por slide)
  const slides = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    slides.push(testimonials.slice(i, i + 2));
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Box bg="dark.surface" rounded="lg" p={{ base: 4, md: 6, lg: 8 }} border="1px" borderColor="dark.border" mb={8}>
      <Heading fontSize="2xl" mb={6} color="white" textAlign="center">
        Lo que dicen mis clientes
      </Heading>

      <Box position="relative">
        {/* Carousel Container */}
        <Box overflow="hidden" position="relative" minH="280px">
          <AnimatePresence mode="wait">
            <MotionBox
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
                {slides[currentSlide].map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </SimpleGrid>
            </MotionBox>
          </AnimatePresence>
        </Box>

        {/* Navigation Buttons */}
        {slides.length > 1 && (
          <>
            <IconButton
              icon={<FaChevronLeft />}
              onClick={handlePrevSlide}
              position="absolute"
              left={{ base: -2, md: -4 }}
              top="50%"
              transform="translateY(-50%)"
              bg="dark.bgAlt"
              color="accent.cyan"
              rounded="full"
              size="sm"
              _hover={{ bg: "accent.cyan", color: "white" }}
              aria-label="Testimonio anterior"
            />
            <IconButton
              icon={<FaChevronRight />}
              onClick={handleNextSlide}
              position="absolute"
              right={{ base: -2, md: -4 }}
              top="50%"
              transform="translateY(-50%)"
              bg="dark.bgAlt"
              color="accent.cyan"
              rounded="full"
              size="sm"
              _hover={{ bg: "accent.cyan", color: "white" }}
              aria-label="Siguiente testimonio"
            />
          </>
        )}

        {/* Dots Navigation */}
        {slides.length > 1 && (
          <HStack justify="center" mt={6} spacing={2}>
            {slides.map((_, index) => (
              <Box
                key={index}
                w={currentSlide === index ? "24px" : "8px"}
                h="8px"
                rounded="full"
                bg={currentSlide === index ? "accent.cyan" : "dark.border"}
                cursor="pointer"
                onClick={() => setCurrentSlide(index)}
                transition="all 0.3s"
                _hover={{ bg: currentSlide === index ? "accent.cyan" : "dark.textSecondary" }}
              />
            ))}
          </HStack>
        )}
      </Box>
    </Box>
  );
}
