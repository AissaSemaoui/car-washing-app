"use client";

import React from "react";
import "./navbar.css";
import Image from "next/image";
import Link from "next/link";
import { Anchor, Button, Flex, NativeSelect } from "@mantine/core";
import { useRouter } from "next/router";

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
  return (
    <Flex
      className="navbar container"
      justify="space-between"
      align="center"
      py={60}
    >
      <div>
        <Image src="/images/logo.png" width={100} height={89} alt="logo" />
      </div>
      <nav className="navbar__navlinks">
        {MENU_ITEMS.map(({ name, link }) => (
          <Link key={link} href={link}>
            <Anchor
              className="navbar__navlinks--item"
              color="gray"
              underline={false}
              component="span"
            >
              {name}
            </Anchor>
          </Link>
        ))}
      </nav>
      <Flex>
        <NativeSelect
          size="lg"
          variant="unstyled"
          defaultValue="English"
          data={["English"]}
        />
        <Button size="lg">Sign in</Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
