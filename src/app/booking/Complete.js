import { Button } from "@mantine/core";
import React from "react";

function Complete({ invoiceUrl, selectedPaymentMethod }) {
  return (
    <div className="completed__screen">
      <img src="./images/success.png" alt="success" />
      <h2>Your Order is Complete!</h2>
      <p>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint.
      </p>
      {selectedPaymentMethod !== "Cash" && (
        <Button component="a" href={invoiceUrl} size="lg" variant="outline">
          View order confirmation
        </Button>
      )}
    </div>
  );
}

export default Complete;
