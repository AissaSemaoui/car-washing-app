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
import { useForm } from "@mantine/form";

function Booking() {
  const [formData, setFormData] = useState({
    selectedVehicle: "",
    selectedPackage: "",
    extraServices: [],
    userDetails: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      area: "",
      block: "",
      avenue: "",
      street: "",
      house: "",
    },
    selectedPaymentMethod: "",
  });

  const userDetailsForm = useForm({
    initialValues: formData?.userDetails,
  });

  const [active, setActive] = useState(1);
  const nextStep = () => {
    if (active !== 4)
      setActive((current) => (current < 5 ? current + 1 : current));
    else
      userDetailsForm.onSubmit((values) => {
        setFormData((prev) => ({ ...prev, userDetails: values }));
        setActive((current) => (current < 5 ? current + 1 : current));
      })();
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Card className="stepper__card container" shadow="md" radius="xl">
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
            completedIcon={
              <img src="./images/step 1.png" className="stepper__icon" />
            }
            icon={
              <img src="./images/dark step 1.png" className="stepper__icon" />
            }>
            <VehicleChoice
              selectedVehicle={formData?.selectedVehicle}
              setFormData={setFormData}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Packages"
            completedIcon={
              <img src="./images/step 2.png" className="stepper__icon" />
            }
            icon={
              <img src="./images/dark step 2.png" className="stepper__icon" />
            }>
            <Packages
              selectedPackage={formData?.selectedPackage}
              setFormData={setFormData}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Extra services"
            completedIcon={
              <img src="./images/step 3.png" className="stepper__icon" />
            }
            icon={
              <img src="./images/dark step 3.png" className="stepper__icon" />
            }>
            <ExtraServices
              extraServices={formData?.extraServices}
              setFormData={setFormData}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Time & Date"
            completedIcon={
              <img src="./images/step 4.png" className="stepper__icon" />
            }
            icon={
              <img src="./images/dark step 4.png" className="stepper__icon" />
            }>
            <TimeDate />
          </Stepper.Step>
          <Stepper.Step
            label="User details"
            completedIcon={
              <img src="./images/step 5.png" className="stepper__icon" />
            }
            icon={
              <img src="./images/dark step 5.png" className="stepper__icon" />
            }>
            <UserDetails
              userDetailsForm={userDetailsForm}
              userDetails={formData?.userDetails}
              selectedPaymentMethod={formData?.selectedPaymentMethod}
              setFormData={setFormData}
            />
          </Stepper.Step>
          <Stepper.Completed
            label="Complete"
            completedIcon={
              <img src="./images/step 6.png" className="stepper__icon" />
            }
            icon={
              <img src="./images/dark step 6.png" className="stepper__icon" />
            }>
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
