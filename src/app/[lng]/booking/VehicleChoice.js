import { useTranslation } from "@/app/i18n/client";
import withDataFetching from "@/utils/withDataFetching";
import { Flex, Grid, Title } from "@mantine/core";
import React from "react";

const VehicleCard = ({ vehicletype, image, className, lng }) => {
  const { t } = useTranslation(lng, "common");

  return (
    <Flex
      className={`vehicle-choice__card ${className}`}
      gap="md"
      align="center"
      direction="column">
      <img src={image} alt={vehicletype} />
      <Title order={3} size="h3" transform="capitalize">
        {t(vehicletype)}
      </Title>
    </Flex>
  );
};

function VehicleChoice({ selectedVehicle, setFormData, lng }) {
  const VEHICLES_DATA = [
    { vehicletype: "sedan", image: "/images/vehicle 1.png" },
    { vehicletype: "suv", image: "/images/vehicle 2.png" },
    { vehicletype: "pickup", image: "/images/vehicle 3.png" },
    { vehicletype: "bike", image: "/images/vehicle 4.png" },
  ];

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
            lng={lng}
            image={image}
            vehicletype={vehicletype}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default VehicleChoice;
