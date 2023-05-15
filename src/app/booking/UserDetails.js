import { Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import React from "react";

const PaymentMethod = () => {};

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
      <div>
        <h3>Payment</h3>
        <Flex></Flex>
      </div>
    </form>
  );
}

export default UserDetails;
