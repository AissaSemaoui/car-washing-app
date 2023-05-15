import { Flex, Grid } from "@mantine/core";
import { Clock, EmptyWallet } from "iconsax-react";
import React from "react";

const EXTRA_SERVICES_DATA = [
  {
    title: "Polishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
    image: "./images/extraService 1.png",
    features: [
      { icon: <Clock size="32" color="#37d67a" />, feature: "15 min" },
      { icon: <EmptyWallet size="32" color="#37d67a" />, feature: "2 Kd" },
    ],
  },
];

const ServiceCard = ({ title, description, image, features }) => (
  <Flex className="extra-services__card" gap={24}>
    <div>
      <img src={image} alt={title} />
    </div>
    <div className="extra-services__card--content">
      <h2>{title}</h2>
      <p>{description}</p>
      <Flex className="extra-services__card--features" align="center">
        {features.map((feature) => (
          <div className="extra-services__features--item">
            {feature?.icon} {feature?.feature}
          </div>
        ))}
      </Flex>
    </div>
  </Flex>
);

function ExtraServices() {
  return (
    <Grid justify="center">
      {EXTRA_SERVICES_DATA.map((service) => (
        <Grid.Col span={12} sm={8} md={6} key={service?.title}>
          <ServiceCard {...service} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default ExtraServices;
