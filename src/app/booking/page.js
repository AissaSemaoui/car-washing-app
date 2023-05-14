"use client";
import { Button, Card, Flex, Stepper } from "@mantine/core";
import React, { useState } from "react";
import "./booking.css";

function Booking() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Card shadow="md" p="xl" radius="xl" className="container">
      <Card.Section>
        <Stepper
          active={active}
          onStepClick={setActive}
          classNames={{
            steps: "stepper__control--wrapper",
          }}
        >
          <Stepper.Step label="First step" description="Create an account">
            Step 1 content: Create an account
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email">
            Step 2 content: Verify email
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Card.Section>
      <Card.Section withBorder inheritPadding py="md">
        <Button
          onClick={nextStep}
          size="lg"
          style={{
            float: "right",
          }}
        >
          Next
        </Button>
        <Button
          variant="outline"
          onClick={prevStep}
          size="lg"
          style={{
            float: "left",
          }}
        >
          Prev
        </Button>
      </Card.Section>
    </Card>
  );
}

export default Booking;
