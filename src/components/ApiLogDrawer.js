import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Text,
  Link,
  Code,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import logger from "../lib/logger";

const DOC_BASE_URL =
  "https://token-api.service.stage.pinax.network/#tag/evm/GET";

function getEndpointDocLink(url) {
  if (!url) return null;
  if (url.includes("/nft/ownerships"))
    return `${DOC_BASE_URL}/nft/ownerships/evm/%7Baddress%7D`;
  if (url.includes("/nft/collections"))
    return `${DOC_BASE_URL}/nft/collections/evm/%7Bcontract%7D`;
  if (url.includes("/nft/items"))
    return `${DOC_BASE_URL}/nft/items/evm/contract/%7Bcontract%7D/token_id/%7Btoken_id%7D`;
  if (url.includes("/nft/activities"))
    return `${DOC_BASE_URL}/nft/activities/evm`;
  if (url.includes("/nft/holders"))
    return `${DOC_BASE_URL}/nft/holders/evm/%7Bcontract%7D`;
  // Add more mappings as needed
  return null;
}

export default function ApiLogDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unsubscribe = logger.subscribe(setLogs);
    return unsubscribe;
  }, []);

  return (
    <>
      <Button onClick={onOpen} position="fixed" bottom="4" left="4" size="sm">
        API Logs
      </Button>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Token API Call Log</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={1}>
              {logs
                .slice(-20)
                .reverse()
                .map((log, index) => {
                  const docLink = getEndpointDocLink(log.url);
                  let logColor = "gray.500";
                  if (log.type === "error") logColor = "red.500";
                  else if (log.type === "response" && log.status !== 200)
                    logColor = "orange.500";
                  else if (log.type === "response") logColor = "green.500";

                  const message =
                    log.type === "request"
                      ? `${log.method} ${log.url}`
                      : log.type === "response"
                        ? `${log.status} ${log.url}`
                        : `${log.message} ${log.url || ""}`;

                  return (
                    <HStack
                      key={`${log.time.toISOString()}-${index}`}
                      justifyContent="space-between"
                    >
                      <Text
                        fontSize="xs"
                        color={logColor}
                        fontFamily="monospace"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        maxW="70%"
                      >
                        {new Date(log.time).toLocaleTimeString()} [
                        {log.type.toUpperCase()}] {message}
                      </Text>
                      {docLink && (
                        <Tooltip label="View API Docs" placement="top">
                          <Link
                            href={docLink}
                            isExternal
                            fontSize="xs"
                            color="blue.500"
                          >
                            [docs]
                          </Link>
                        </Tooltip>
                      )}
                    </HStack>
                  );
                })}
              {logs.length === 0 && <Text>No API calls yet.</Text>}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
