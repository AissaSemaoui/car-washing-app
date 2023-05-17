"use client";
import { Button, Card, Flex, Stepper, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import "./booking.css";
import VehicleChoice from "./VehicleChoice";
import Packages from "./Packages";
import ExtraServices from "./ExtraServices";
import UserDetails from "./UserDetails";
import Complete from "./Complete";
import TimeDate from "./TimeDate";
import { useForm } from "@mantine/form";

function Booking() {
  const [error, setError] = useState("");

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
    scheduledDate: { date: null, hour: "" },
    occupiedDates: ["05-16-2023 15:15", "05-18-2023 12:15"], // write occupied dates as array of strings match exact format ex: 05-16-2023 15:15
    selectedPaymentMethod: "",
  });

  const userDetailsForm = useForm({
    initialValues: formData?.userDetails,
  });

  const [active, setActive] = useState(0);
  const nextStep = () => {
    const goNext = () => {
      setActive((current) => (current < 5 ? current + 1 : current));
      console.log(formData);
    };
    switch (active) {
      case 0:
        !!formData?.selectedVehicle
          ? goNext()
          : setError("Please select a vehicle");
        break;
      case 1:
        !!formData?.selectedPackage
          ? goNext()
          : setError("Please select a package");
        break;
      case 2:
        goNext();
        break;
      case 3:
        !!formData?.scheduledDate.hour
          ? goNext()
          : setError("Please schedule a date");
        break;
      case 4:
        if (!formData.selectedPaymentMethod)
          setError("Please select a payment method");
        formData.selectedPaymentMethod &&
          userDetailsForm.onSubmit((values) => {
            setFormData((prev) => ({ ...prev, userDetails: values }));
            goNext();
          })();
        break;
        Default: return;
    }
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (error) setError("");
  }, [formData, active]);

  return (
    <Card className="stepper__card" shadow="md" radius="xl">
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
            allowStepClick={!!formData?.selectedVehicle}
            allowStepSelect={!!formData?.selectedVehicle}
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
            allowStepClick={!!formData?.selectedPackage}
            allowStepSelect={!!formData?.selectedPackage}
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
            allowStepClick={!!formData?.selectedPackage}
            allowStepSelect={!!formData?.selectedPackage}
            completedIcon={
              <img src="./images/step 4.png" className="stepper__icon" />
            }
            icon={
              <img src="./images/dark step 4.png" className="stepper__icon" />
            }>
            <TimeDate
              scheduledDate={formData?.scheduledDate}
              occupiedDates={formData?.occupiedDates}
              setFormData={setFormData}
            />
          </Stepper.Step>
          <Stepper.Step
            label="User details"
            allowStepClick={!!formData?.scheduledDate?.hour}
            allowStepSelect={!!formData?.scheduledDate?.hour}
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
        <p className="error__message">{error}</p>
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
