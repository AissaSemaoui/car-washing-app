"use client";
import { Button, Card, Flex, Stepper } from "@mantine/core";
import React, { useState } from "react";
import "./booking.css";
import VehicleChoice from "./VehicleChoice";
import Packages from "./Packages";
import ExtraServices from "./ExtraServices";
import UserDetails from "./UserDetails";
import TimeDate from "./TimeDate";

function Booking() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Card className="container" my="lg" shadow="md" px="lg" py="md" radius="xl">
      <Card.Section>
        <Stepper
          active={active}
          onStepClick={setActive}
          classNames={{
            steps: "stepper__control--wrapper",
            content: "stepper__content--wrapper",
          }}
        >
          <Stepper.Step label="Vehicle choice">
            <VehicleChoice />
          </Stepper.Step>
          <Stepper.Step label="Packages">
            <Packages />
          </Stepper.Step>
          <Stepper.Step label="Extra services">
            <ExtraServices />
          </Stepper.Step>
          <Stepper.Step label="Time & Date">
            <TimeDate />
          </Stepper.Step>
          <Stepper.Step label="User details">
            <UserDetails />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Card.Section>
      <Card.Section withBorder inheritPadding py="md">
        <Flex justify="space-between">
          <Button variant="outline" onClick={prevStep} size="lg">
            Prev
          </Button>
          <Button onClick={nextStep} size="lg">
            Next
          </Button>
        </Flex>
      </Card.Section>
    </Card>
  );
}

export default Booking;
