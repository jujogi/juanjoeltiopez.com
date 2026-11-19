"use client";

import { Box, HStack, Image, Link, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { trackArmonia } from "@/lib/gtm";
import { getSpeciesById } from "@/lib/speciesData";
import { getShopContactLink, getShopsByPlace } from "@/lib/speciesShops";
import { useArmoniaLang } from "./useArmoniaLang";

// "¿Dónde comprar…?" dentro de la ficha: las tiendas aliadas que venden la especie, por país y
// ciudad, y, siempre, la invitación para que otras tiendas escriban. Sin tiendas solo queda la
// invitación. El mensaje de WhatsApp y Analytics van con el nombre en español, en los dos idiomas.
export default function WhereToBuy({ species }) {
  const { lang, copy } = useArmoniaLang();
  const { whereToBuy } = copy;
  const places = getShopsByPlace(species.id, lang);
  const nameEs = getSpeciesById(species.id).name;

  return (
    <Box mt={4} pt={4} borderTop="1px" borderColor="dark.border">
      <Text as="h5" fontSize="sm" fontWeight="700" color="white">
        {whereToBuy.heading(species.name)}
      </Text>
      {places.length > 0 && (
        <>
          <Text fontSize="xs" color="dark.textMuted" mt={1}>
            {whereToBuy.sponsored}
          </Text>
          <Stack spacing={3} mt={3}>
            {places.map(({ country, countryName, cities }) => (
              <Box key={country}>
                <Text
                  as="h6"
                  fontSize="xs"
                  fontWeight="700"
                  color="dark.textSecondary"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {countryName}
                </Text>
                <Stack spacing={2} mt={1}>
                  {cities.map(({ city, shops }) => (
                    <Box key={city}>
                      <Text fontSize="xs" color="dark.textMuted">
                        {city}
                      </Text>
                      <Wrap spacing={2} mt={1}>
                        {shops.map(shop => (
                          <WrapItem key={shop.id}>
                            <ShopLink shop={shop} speciesName={nameEs} />
                          </WrapItem>
                        ))}
                      </Wrap>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </>
      )}
      <Text fontSize="sm" color="dark.textSecondary" mt={3}>
        {whereToBuy.shopsInvite(species.name)}{" "}
        <Link
          href={getShopContactLink(nameEs)}
          isExternal
          color="accent.cyan"
          onClick={() => trackArmonia("contacto_tienda", { especie: nameEs })}
        >
          {whereToBuy.shopsInviteCta}
        </Link>
      </Text>
    </Box>
  );
}

function ShopLink({ shop, speciesName }) {
  return (
    <Link
      href={shop.url}
      target="_blank"
      rel="sponsored noopener"
      onClick={() =>
        trackArmonia("tienda", {
          especie: speciesName,
          tienda: shop.name,
          pais: shop.country,
          ciudad: shop.city,
        })
      }
      display="block"
      bg="dark.surface"
      border="1px"
      borderColor="dark.border"
      rounded="lg"
      px={3}
      py={2}
      _hover={{ borderColor: "accent.cyan", textDecoration: "none" }}
    >
      <HStack spacing={2}>
        {shop.logo && <Image src={shop.logo} alt="" h="32px" maxW="72px" objectFit="contain" />}
        <Text fontSize="sm" fontWeight="600" color="white" lineHeight="1.2">
          {shop.name}
        </Text>
      </HStack>
    </Link>
  );
}
