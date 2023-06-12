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
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "@/app/i18n/client";
import i18next from "i18next";
import { usePathname, useRouter } from "next/navigation";

function Navbar({ lng }) {
  const router = useRouter();
  const path = usePathname();

  const currentPath = path.replace(`/${lng}`, "");

  const { t } = useTranslation(lng, "common");

  const MENU_ITEMS = [
    {
      name: t("home"),
      link: "/",
    },
    {
      name: t("booking"),
      link: "/booking",
    },
    {
      name: t("aboutUs"),
      link: "",
    },
  ];

  const [opened, { open, close, toggle }] = useDisclosure(false);

  return (
    <Flex className="navbar container" justify="space-between" align="center">
      <div>
        <img src="/images/logo.png" className="navbar__logo" alt="logo" />
      </div>
      <nav className="navbar__navlinks lg">
        {MENU_ITEMS.map(({ name, link }) => (
          <Link key={link} href={`/${lng}${link}`}>
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
          onChange={(event) =>
            router.push(`/${event.target.value}${currentPath}`)
          }
          defaultValue={lng}
          data={[
            { label: "English", value: "en" },
            { label: "العربية", value: "ar" },
          ]}
        />
        <Button size="lg">{t("signIn")}</Button>
      </Flex>
      <Burger className="navbar__burger" opened={opened} onClick={toggle} />
      <Drawer
        padding="lg"
        opened={opened}
        onClose={close}
        className="navbar__drawer">
        <nav className="navbar__navlinks">
          {MENU_ITEMS.map(({ name, link }) => (
            <Link key={link} href={`/${lng}${link}`} onClick={close}>
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
            onChange={(event) =>
              router.push(`/${event.target.value}${currentPath}`)
            }
            defaultValue={lng}
            data={[
              { label: "English", value: "en" },
              { label: "العربية", value: "ar" },
            ]}
          />
          <Button size="lg" fullWidth>
            {t("signIn")}
          </Button>
        </Flex>
      </Drawer>
    </Flex>
  );
}

export default Navbar;
