import { Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Card } from "iconsax-react";

import React from "react";

const PAYMENT_METHODS_DATA = [
  {
    name: "Cash",
    img: "./images/moneys.png",
  },
  {
    name: "Knet",
    img: "./images/Knet.png",
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
}) {
  const handleSelectPaymentMethod = (selectedPaymentMethod) =>
    setFormData((prev) => ({
      ...prev,
      selectedPaymentMethod,
    }));

  return (
    <form className="user-details">
      <div className="user-details__inputs--wrapper">
        <TextInput
          label="First name"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("firstName")}
        />
        <TextInput
          label="Last name"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("lastName")}
        />
        <TextInput
          label="Phone number"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("phoneNumber")}
        />
        <TextInput
          label="Area"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("area")}
        />
        <TextInput
          label="Block"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("block")}
        />
        <TextInput
          label="Avenue"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("avenue")}
        />
        <TextInput
          label="Street"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("street")}
        />
        <TextInput
          label="House"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userDetailsForm.getInputProps("house")}
        />
      </div>
      <div className="user-details__payment_methods">
        <h3>Payment</h3>
        <Flex justify="space-between" gap={8}>
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
