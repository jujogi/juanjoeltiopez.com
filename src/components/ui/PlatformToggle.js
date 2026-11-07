"use client";

import { HStack, Button, Icon } from "@chakra-ui/react";
import { FaTiktok, FaInstagram } from "react-icons/fa";

const PLATFORMS = [
  { key: "tiktok", label: "TikTok", icon: FaTiktok },
  { key: "instagram", label: "Instagram", icon: FaInstagram },
];

// Selector TikTok / Instagram de los widgets de videos
export default function PlatformToggle({ value, onChange, ...props }) {
  return (
    <HStack spacing={2} {...props}>
      {PLATFORMS.map(platform => {
        const isActive = value === platform.key;
        return (
          <Button
            key={platform.key}
            size="sm"
            flex="1"
            fontSize="xs"
            aria-pressed={isActive}
            variant={isActive ? "solid" : "outline"}
            borderColor="dark.border"
            color={isActive ? "water.950" : "dark.textSecondary"}
            _hover={isActive ? undefined : { color: "white" }}
            onClick={() => onChange(platform.key)}
            leftIcon={<Icon as={platform.icon} boxSize={3} />}
          >
            {platform.label}
          </Button>
        );
      })}
    </HStack>
  );
}
