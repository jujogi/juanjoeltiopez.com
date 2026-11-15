import { Box, HStack, Image, Link, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { getShopContactLink, getShopsFor, whereToBuy } from "@/lib/speciesShops";

// "¿Dónde comprar…?" dentro de la ficha: las tiendas aliadas que venden la especie y, siempre,
// la invitación para que otras tiendas escriban. Sin tiendas solo queda la invitación.
export default function WhereToBuy({ species }) {
  const shops = getShopsFor(species.id);

  return (
    <Box mt={4} pt={4} borderTop="1px" borderColor="dark.border">
      <Text as="h5" fontSize="sm" fontWeight="700" color="white">
        {whereToBuy.heading(species.name)}
      </Text>
      {shops.length > 0 && (
        <>
          <Text fontSize="xs" color="dark.textMuted" mt={1}>
            {whereToBuy.sponsored}
          </Text>
          <Wrap spacing={2} mt={2}>
            {shops.map(shop => (
              <WrapItem key={shop.id}>
                <Link
                  href={shop.url}
                  target="_blank"
                  rel="sponsored noopener"
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
                    {shop.logo && (
                      <Image src={shop.logo} alt="" h="24px" maxW="72px" objectFit="contain" />
                    )}
                    <Box>
                      <Text fontSize="sm" fontWeight="600" color="white" lineHeight="1.2">
                        {shop.name}
                      </Text>
                      {shop.city && (
                        <Text fontSize="xs" color="dark.textMuted">
                          {shop.city}
                        </Text>
                      )}
                    </Box>
                  </HStack>
                </Link>
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
      <Text fontSize="sm" color="dark.textSecondary" mt={2}>
        {whereToBuy.shopsInvite(species.name)}{" "}
        <Link href={getShopContactLink(species.name)} isExternal color="accent.cyan">
          {whereToBuy.shopsInviteCta}
        </Link>
      </Text>
    </Box>
  );
}
