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

const PaymentMethod = ({ name, img }) => (
  <div className="payment-method__card">
    {typeof img === "string" ? <img src={img} alt={name} /> : img}
    <h4>{name}</h4>
  </div>
);

function UserDetails() {
  const userForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      area: "",
      block: "",
      avenue: "",
      street: "",
      house: "",
    },
  });

  const handleSubmit = (values) => console.log(values);

  return (
    <form onSubmit={userForm.onSubmit(handleSubmit)} className="user-details">
      <div className="user-details__inputs--wrapper">
        <TextInput
          label="First name"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userForm.getInputProps("firstName")}
        />
        <TextInput
          label="Last name"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userForm.getInputProps("lastName")}
        />
        <TextInput
          label="Phone number"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userForm.getInputProps("phoneNumber")}
        />
        <TextInput
          label="Area"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userForm.getInputProps("area")}
        />
        <TextInput
          label="Block"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userForm.getInputProps("block")}
        />
        <TextInput
          label="Avenue"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userForm.getInputProps("avenue")}
        />
        <TextInput
          label="Street"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userForm.getInputProps("street")}
        />
        <TextInput
          label="House"
          placeholder="text here..."
          size="md"
          variant="filled"
          className="user-details__input"
          {...userForm.getInputProps("house")}
        />
      </div>
      <div className="user-details__payment_methods">
        <h3>Payment</h3>
        <Flex justify="space-between" gap={8}>
          {PAYMENT_METHODS_DATA.map((payment) => (
            <PaymentMethod {...payment} />
          ))}
        </Flex>
      </div>
    </form>
  );
}

export default UserDetails;
