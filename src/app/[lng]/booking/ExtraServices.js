import React from "react";

import { Flex, Grid } from "@mantine/core";
import { Clock, EmptyWallet } from "iconsax-react";
import withDataFetching from "@/utils/withDataFetching";

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

const ServiceCard = ({ extraservices, className }) => (
  <Flex
    className={`extra-services__card ${className}`}
    align="center"
    justify="center"
    gap={24}>
    <div className="extra-services__card--content">
      <h2>{extraservices}</h2>
    </div>
  </Flex>
);

function ExtraServices({ data, extraservicesId, setFormData }) {
  const handleSelect = (extraServiceId) => {
    setFormData((prev) => ({ ...prev, extraservicesId: extraServiceId }));
  };


  return (
    <Grid justify="center">
      {data?.extraservices?.map((extraService) => (
        <Grid.Col
          span={12}
          sm={6}
          key={extraService._id}
          onClick={() => handleSelect(extraService?._id)}>
          <ServiceCard
            {...extraService}
            className={extraservicesId === extraService._id && "selected"}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

const api_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/extra-services/allextraservices`;

export default withDataFetching(api_url)(ExtraServices);
