"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Flex,
  LoadingOverlay,
  Stepper,
  Text,
} from "@mantine/core";
import "./booking.css";
import VehicleChoice from "./VehicleChoice";
import Packages from "./Packages";
import ExtraServices from "./ExtraServices";
import UserDetails from "./UserDetails";
import Complete from "./Complete";
import TimeDate from "./TimeDate";
import { useForm } from "@mantine/form";
import { useScrollIntoView } from "@mantine/hooks";
import { validateStep } from "@/utils/stepsValidation";
import { userDetailsValidation } from "@/utils/userDetailsValidation";
import { useTranslation } from "@/app/i18n/client";

const DEFAULT_FORM_DATA = {
  selectedVehicle: {
    vehicletype: "",
  },
  selectedPackageId: "",
  extraservicesId: "",
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
  scheduledDate: { date: null, hour: "", fullDate: "" },
  occupiedDates: ["05-16-2023 15:15", "05-18-2023 12:15"], // write occupied dates as array of strings match exact format ex: 05-16-2023 15:15
  selectedPaymentMethod: "",
};

function MainStepper({ lng }) {
  const { t } = useTranslation(lng, "common");

  const [error, setError] = useState("");
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 60 });

  const userDetailsForm = useForm({
    initialValues: formData?.userDetails,
    validate: userDetailsValidation,
  });

  const [active, setActive] = useState(0);

  const nextStep = async () => {
    const goNext = () => {
      setActive((current) => (current < 5 ? current + 1 : current));
      scrollIntoView({ alignment: "start" });
    };

    setLoading(true);
    const isValidStep = await validateStep(
      active,
      formData,
      setError,
      userDetailsForm,
      setFormData,
      setInvoiceUrl
    );
    setLoading(false);

    if (isValidStep) {
      goNext();
    }
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  useEffect(() => {
    if (error) setError("");
  }, [formData, active]);

  useEffect(() => {
    targetRef.current = document.querySelector(".stepper__content--wrapper");
  }, []);

  return (
    <Card className="stepper__card" shadow="md" radius="xl">
      <Card.Section>
        <LoadingOverlay visible={isLoading} blur={3} />
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="md"
          classNames={{
            steps: "stepper__control--wrapper",
            content: "stepper__content--wrapper",
          }}>
          <Stepper.Step
            label={t("vehicleChoice")}
            completedIcon={
              <img src="/images/step 1.png" className="stepper__icon" />
            }
            icon={
              <img src="/images/dark step 1.png" className="stepper__icon" />
            }
            loading={active === 0 && isLoading}>
            <VehicleChoice
              selectedVehicle={formData?.selectedVehicle}
              setFormData={setFormData}
              lng={lng}
            />
          </Stepper.Step>
          <Stepper.Step
            label={t("packages")}
            allowStepClick={!!formData?.selectedVehicle}
            allowStepSelect={!!formData?.selectedVehicle}
            completedIcon={
              <img src="/images/step 2.png" className="stepper__icon" />
            }
            icon={
              <img src="/images/dark step 2.png" className="stepper__icon" />
            }
            loading={active === 1 && isLoading}>
            <Packages
              selectedPackageId={formData?.selectedPackageId}
              setFormData={setFormData}
              selectedVehicle={formData?.selectedVehicle}
            />
          </Stepper.Step>
          <Stepper.Step
            label={t("extraServices")}
            allowStepClick={!!formData?.selectedPackageId}
            allowStepSelect={!!formData?.selectedPackageId}
            completedIcon={
              <img src="/images/step 3.png" className="stepper__icon" />
            }
            icon={
              <img src="/images/dark step 3.png" className="stepper__icon" />
            }
            loading={active === 2 && isLoading}>
            <ExtraServices
              extraservicesId={formData?.extraservicesId}
              setFormData={setFormData}
            />
          </Stepper.Step>
          <Stepper.Step
            label={t("time&date")}
            allowStepClick={!!formData?.selectedPackageId}
            allowStepSelect={!!formData?.selectedPackageId}
            completedIcon={
              <img src="/images/step 4.png" className="stepper__icon" />
            }
            icon={
              <img src="/images/dark step 4.png" className="stepper__icon" />
            }
            loading={active === 3 && isLoading}>
            <TimeDate
              scheduledDate={formData?.scheduledDate}
              occupiedDates={formData?.occupiedDates}
              setFormData={setFormData}
            />
          </Stepper.Step>
          <Stepper.Step
            label={t("userDetails")}
            allowStepClick={!!formData?.scheduledDate?.hour}
            allowStepSelect={!!formData?.scheduledDate?.hour}
            completedIcon={
              <img src="/images/step 5.png" className="stepper__icon" />
            }
            icon={
              <img src="/images/dark step 5.png" className="stepper__icon" />
            }
            loading={active === 4 && isLoading}>
            <UserDetails
              lng={lng}
              userDetailsForm={userDetailsForm}
              userDetails={formData?.userDetails}
              selectedPaymentMethod={formData?.selectedPaymentMethod}
              setFormData={setFormData}
            />
          </Stepper.Step>
          <Stepper.Completed
            label={t("complete")}
            completedIcon={
              <img src="/images/step 6.png" className="stepper__icon" />
            }
            icon={
              <img src="/images/dark step 6.png" className="stepper__icon" />
            }>
            <Complete
              lng={lng}
              invoiceUrl={invoiceUrl}
              selectedPaymentMethod={formData.selectedPaymentMethod}
            />
          </Stepper.Completed>
        </Stepper>
      </Card.Section>
      <Card.Section withBorder inheritPadding py="md">
        <p className="error__message">{t(error)}</p>
        <Flex justify="space-between">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={prevStep}
            size="lg">
            {t("prev")}
          </Button>
          {active < 5 && (
            <Button onClick={nextStep} disabled={isLoading} size="lg">
              {active === 4 ? t("bookNow") : t("next")}
            </Button>
          )}
        </Flex>
      </Card.Section>
    </Card>
  );
}

export default MainStepper;
