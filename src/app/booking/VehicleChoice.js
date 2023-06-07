import withDataFetching from "@/utils/withDataFetching";
import { Flex, Grid, Title } from "@mantine/core";
import React from "react";

const VEHICLES_DATA = [
  { vehicletype: "sedan", image: "./images/vehicle 1.png" },
  { vehicletype: "suv", image: "./images/vehicle 2.png" },
  { vehicletype: "pickup", image: "./images/vehicle 3.png" },
  { vehicletype: "bike", image: "./images/vehicle 4.png" },
];

const VehicleCard = ({ vehicletype, image, className }) => (
  <Flex
    className={`vehicle-choice__card ${className}`}
    gap="md"
    align="center"
    direction="column">
    <img src={image} alt={vehicletype} />
    <Title order={3} size="h3" transform="capitalize">
      {vehicletype}
    </Title>
  </Flex>
);

function VehicleChoice({ selectedVehicle, setFormData }) {
  const handleSelect = (vehicletype) => {
    setFormData((prev) => ({
      ...prev,
      selectedVehicle: {
        vehicletype,
      },
    }));
  };

  return (
    <Grid>
      {VEHICLES_DATA.map(({ vehicletype, image }) => (
        <Grid.Col
          span={12}
          sm={6}
          key={vehicletype}
          onClick={() => handleSelect(vehicletype)}>
          <VehicleCard
            className={
              selectedVehicle?.vehicletype === vehicletype && "selected"
            }
            image={image}
            vehicletype={vehicletype}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default VehicleChoice;
