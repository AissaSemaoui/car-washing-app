import withDataFetching from "@/utils/withDataFetching";
import { Flex, Grid, Title } from "@mantine/core";
import { Clock, TickCircle } from "iconsax-react";
import React from "react";

const PACKAGES_DATA = [
  {
    packagename: "Basic ✪",
    packagefeatures: [
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
    ],
    packageprice: {
      suv: 30,
      sedan: 25,
      pickup: 35,
      bike: 15,
    },
    duration: "30 min",
    salon: "3",
  },
  {
    packagename: "Plus ✪",
    packagefeatures: [
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
    ],
    packageprice: {
      suv: 30,
      sedan: 25,
      pickup: 35,
      bike: 15,
    },
    duration: "30 min",
    salon: "7",
  },
  {
    packagename: "Premium ✪",
    packagefeatures: [
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
    ],
    packageprice: {
      suv: 30,
      sedan: 25,
      pickup: 35,
      bike: 15,
    },
    duration: "60 min",
    salon: "28",
  },
  {
    packagename: "Standard ✪",
    packagefeatures: [
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
      "Lorem Ipsum is simply dummy text of the",
    ],
    packageprice: {
      suv: 30,
      sedan: 25,
      pickup: 35,
      bike: 15,
    },
    duration: "120 min",
    salon: "8.500",
  },
];

const PackageCard = ({
  selectedVehicle,
  packagename,
  packagefeatures,
  packageprice,
  duration,
  salon,
  className,
}) => (
  <div className={`package__card ${className}`}>
    <Flex
      className="package__card--header"
      justify="space-between"
      align="center">
      <Title order={3} transform="capitalize">
        {packagename}
      </Title>
      <div className="package__salon--card">
        {/* <h4>Salon & jeep</h4>
        <p>{salon}&nbsp;Kd</p> */}
        <h4>{packageprice[selectedVehicle?.vehicletype]} KWD</h4>
      </div>
    </Flex>
    <ul className="package__card--packagefeatures">
      {packagefeatures.map((feature, index) => (
        <li key={index} className="package__card--feature">
          <TickCircle size="24" style={{ minWidth: 24 }} color="#37d67a" />{" "}
          {feature}
        </li>
      ))}
    </ul>
    {duration && (
      <div className="package__card--duration">
        <Clock size="34" color="#2A9DF4" /> {duration} <span />
      </div>
    )}
  </div>
);

function Packages({ data, selectedVehicle, selectedPackageId, setFormData }) {
  const handleSelect = (selectedPackageId) => {
    setFormData((prev) => ({ ...prev, selectedPackageId }));
  };
  return (
    <Grid>
      {data.packages.map((package_data) => (
        <Grid.Col
          span={12}
          sm={6}
          key={package_data?._id}
          onClick={() => handleSelect(package_data?._id)}>
          <PackageCard
            {...package_data}
            selectedVehicle={selectedVehicle}
            className={package_data?._id === selectedPackageId && "selected"}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

const api_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/wash-packages/allpackages`;

export default withDataFetching(api_url)(Packages);
