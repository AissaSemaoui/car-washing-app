import { Flex, Grid } from "@mantine/core";
import { Clock, TickCircle } from "iconsax-react";
import React from "react";

const PACKAGES_DATA = [
  {
    name: "Basic",
    title: "Basic ✪",
    features: [
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
    ],
    duration: "30 min",
    salon: "3",
  },
  {
    name: "Plus",
    title: "Plus ✪",
    features: [
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
    ],
    duration: "30 min",
    salon: "7",
  },
  {
    name: "Premium",
    title: "Premium ✪",
    features: [
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
    ],
    duration: "60 min",
    salon: "28",
  },
  {
    name: "Standard",
    title: "Standard ✪",
    features: [
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
    ],
    duration: "120 min",
    salon: "8.500",
  },
];

const PackageCard = ({ title, features, duration, salon, className }) => (
  <div className={`package__card ${className}`}>
    <Flex
      className="package__card--header"
      justify="space-between"
      align="center">
      <h3>{title}</h3>
      <div className="package__salon--card">
        <h4>Salon & jeep</h4>
        <p>{salon}&nbsp;Kd</p>
      </div>
    </Flex>
    <ul className="package__card--features">
      {features.map((feature, index) => (
        <li key={index} className="package__card--feature">
          <TickCircle size="24" color="#37d67a" /> {feature}
        </li>
      ))}
    </ul>
    <div className="package__card--duration">
      <Clock size="34" color="#2A9DF4" /> {duration} <span />
    </div>
  </div>
);

function Packages({ selectedPackage, setFormData }) {
  const handleSelect = (selectedPackage) => {
    setFormData((prev) => ({ ...prev, selectedPackage }));
  };

  return (
    <Grid>
      {PACKAGES_DATA.map((package_data) => (
        <Grid.Col
          span={12}
          sm={6}
          key={package_data?.title}
          onClick={() => handleSelect(package_data?.name)}>
          <PackageCard
            {...package_data}
            className={package_data?.name === selectedPackage && "selected"}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default Packages;
