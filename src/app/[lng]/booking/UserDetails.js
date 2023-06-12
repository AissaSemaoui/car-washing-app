import { useTranslation } from "@/app/i18n/client";
import { Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Card } from "iconsax-react";

import React from "react";

const PAYMENT_METHODS_DATA = [
  {
    name: "Cash",
    img: "/images/moneys.png",
  },
  {
    name: "Knet",
    img: "/images/Knet.png",
  },
  {
    name: "Credit credit",
    img: <Card size="32" color="#555555" />,
  },
];

const PaymentMethod = ({ name, img, className, onClick }) => (
  <div className={`payment-method__card ${className}`} onClick={onClick}>
    <h4>{name}</h4>
    {typeof img === "string" ? <img src={img} alt={name} /> : img}
  </div>
);

function UserDetails({
  userDetailsForm,
  userDetails,
  selectedPaymentMethod,
  setFormData,
  lng,
}) {
  const { t } = useTranslation(lng, "common");

  const handleSelectPaymentMethod = (selectedPaymentMethod) =>
    setFormData((prev) => ({
      ...prev,
      selectedPaymentMethod,
    }));

  return (
    <form className="user-details">
      <div className="user-details__inputs--wrapper">
        <TextInput
          label={t("firstName")}
          placeholder={t("placeholderInput")}
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("firstName")}
        />
        <TextInput
          label={t("lastName")}
          placeholder={t("placeholderInput")}
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("lastName")}
        />
        <TextInput
          label={t("phoneNumber")}
          placeholder={t("placeholderInput")}
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("phoneNumber")}
        />
        <TextInput
          label={t("area")}
          placeholder={t("placeholderInput")}
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("area")}
        />
        <TextInput
          label={t("block")}
          placeholder={t("placeholderInput")}
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("block")}
        />
        <TextInput
          label={t("avenue")}
          placeholder={t("placeholderInput")}
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("avenue")}
        />
        <TextInput
          label={t("street")}
          placeholder={t("placeholderInput")}
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("street")}
        />
        <TextInput
          label={t("house")}
          placeholder={t("placeholderInput")}
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("house")}
        />
      </div>
      <div className="user-details__payment_methods">
        <h3>{t("payment")}</h3>
        <Flex justify="space-between" wrap="wrap" gap={8}>
          {PAYMENT_METHODS_DATA.map((payment) => (
            <PaymentMethod
              key={payment?.name}
              {...payment}
              onClick={() => handleSelectPaymentMethod(payment?.name)}
              className={selectedPaymentMethod === payment?.name && "selected"}
            />
          ))}
        </Flex>
      </div>
    </form>
  );
}

export default UserDetails;
