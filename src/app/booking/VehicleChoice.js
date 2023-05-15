import { Flex, Grid } from "@mantine/core";
import React from "react";

const VEHICLES_DATA = [
  { label: "Sedan", image: "./images/vehicle 1.png" },
  { label: "SUV", image: "./images/vehicle 2.png" },
  { label: "Pickup", image: "./images/vehicle 3.png" },
  { label: "Bike", image: "./images/vehicle 4.png" },
];

const VehicleCard = ({ label, image }) => (
  <Flex
    className="vehicle-choice__card"
    gap="md"
    align="center"
    direction="column"
  >
    <img src={image} alt={label} />
    <h3>{label}</h3>
  </Flex>
);

function VehicleChoice() {
  const handleSelect = () => {};

  return (
    <Grid>
      {VEHICLES_DATA.map(({ label, image }) => (
        <Grid.Col span={12} sm={6} key={label}>
          <VehicleCard label={label} image={image} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default VehicleChoice;
