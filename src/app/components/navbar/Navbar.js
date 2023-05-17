"use client";

import React from "react";
import "./navbar.css";
import Link from "next/link";
import {
  Anchor,
  Burger,
  Button,
  Drawer,
  Flex,
  NativeSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const MENU_ITEMS = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Booking",
    link: "/booking",
  },
  {
    name: "About US",
    link: "/about",
  },
];

function Navbar() {
  const [opened, { open, close, toggle }] = useDisclosure(false);

  return (
    <Flex className="navbar container" justify="space-between" align="center">
      <div>
        <img src="/images/logo.png" className="navbar__logo" alt="logo" />
      </div>
      <nav className="navbar__navlinks lg">
        {MENU_ITEMS.map(({ name, link }) => (
          <Link key={link} href={link}>
            <Anchor
              className="navbar__navlinks--item"
              color="gray"
              underline={false}
              component="span">
              {name}
            </Anchor>
          </Link>
        ))}
      </nav>
      <Flex className="navbar__actions">
        <NativeSelect
          size="lg"
          variant="unstyled"
          defaultValue="English"
          data={["English"]}
        />
        <Button size="lg">Sign in</Button>
      </Flex>
      <Burger className="navbar__burger" opened={opened} onClick={toggle} />
      <Drawer
        padding="lg"
        opened={opened}
        onClose={close}
        className="navbar__drawer">
        <nav className="navbar__navlinks">
          {MENU_ITEMS.map(({ name, link }) => (
            <Link key={link} href={link}>
              <Anchor
                className="navbar__navlinks--item"
                color="gray"
                underline={false}
                component="span">
                {name}
              </Anchor>
            </Link>
          ))}
        </nav>
        <Flex justify="space-around" gap="md">
          <NativeSelect
            size="lg"
            // variant="unstyled"
            defaultValue="English"
            data={["English"]}
          />
          <Button size="lg" fullWidth>
            Sign in
          </Button>
        </Flex>
      </Drawer>
    </Flex>
  );
}

export default Navbar;
