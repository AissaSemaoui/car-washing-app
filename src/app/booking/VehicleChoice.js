import { Flex, Grid } from "@mantine/core";
import React from "react";

const VEHICLES_DATA = [
  { name: "Sedan", image: "./images/vehicle 1.png" },
  { name: "SUV", image: "./images/vehicle 2.png" },
  { name: "Pickup", image: "./images/vehicle 3.png" },
  { name: "Bike", image: "./images/vehicle 4.png" },
];

const VehicleCard = ({ name, image, className }) => (
  <Flex
    className={`vehicle-choice__card ${className}`}
    gap="md"
    align="center"
    direction="column">
    <img src={image} alt={name} />
    <h3>{name}</h3>
  </Flex>
);

function VehicleChoice({ selectedVehicle, setFormData }) {
  const handleSelect = (selectedVehicle) => {
    setFormData((prev) => ({ ...prev, selectedVehicle }));
  };

  return (
    <Grid>
      {VEHICLES_DATA.map(({ name, image }) => (
        <Grid.Col
          span={12}
          sm={6}
          key={name}
          onClick={() => handleSelect(name)}>
          <VehicleCard
            className={selectedVehicle === name && "selected"}
            name={name}
            image={image}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default VehicleChoice;
