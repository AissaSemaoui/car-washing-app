"use client";
import { Button, Card, Flex, Stepper } from "@mantine/core";
import React, { useState } from "react";
import "./booking.css";
import VehicleChoice from "./VehicleChoice";
import Packages from "./Packages";
import ExtraServices from "./ExtraServices";
import UserDetails from "./UserDetails";
import Complete from "./Complete";
import TimeDate from "./TimeDate";

function Booking() {
  const [formData, setFormData] = useState();

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 6 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Card className="container" my="lg" shadow="md" px="lg" py="md" radius="xl">
      <Card.Section>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="md"
          classNames={{
            steps: "stepper__control--wrapper",
            content: "stepper__content--wrapper",
          }}>
          <Stepper.Step
            label="Vehicle choice"
            icon={<img src="./images/step 1.png" className="stepper__icon" />}>
            <VehicleChoice formData={formData} setFormData={setFormData} />
          </Stepper.Step>
          <Stepper.Step
            label="Packages"
            icon={<img src="./images/step 2.png" className="stepper__icon" />}>
            <Packages />
          </Stepper.Step>
          <Stepper.Step
            label="Extra services"
            icon={<img src="./images/step 3.png" className="stepper__icon" />}>
            <ExtraServices />
          </Stepper.Step>
          <Stepper.Step
            label="Time & Date"
            icon={<img src="./images/step 4.png" className="stepper__icon" />}>
            <TimeDate />
          </Stepper.Step>
          <Stepper.Step
            label="User details"
            icon={<img src="./images/step 5.png" className="stepper__icon" />}>
            <UserDetails />
          </Stepper.Step>
          <Stepper.Step
            label="Complete"
            icon={<img src="./images/step 6.png" className="stepper__icon" />}>
            <Complete />
          </Stepper.Step>
          <Stepper.Completed>
            <Complete />
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
