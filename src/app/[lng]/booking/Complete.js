import { useTranslation } from "@/app/i18n/client";
import { Button } from "@mantine/core";
import React from "react";

function Complete({ invoiceUrl, selectedPaymentMethod, lng }) {
  const { t } = useTranslation(lng, "common");

  return (
    <div className="completed__screen">
      <img src="./images/success.png" alt="success" />
      <h2>{t("successTitle")}</h2>
      <p>{t("successDescription")}</p>
      {invoiceUrl && selectedPaymentMethod !== "Cash" && (
        <Button component="a" href={invoiceUrl} size="lg" variant="outline">
          {t("successButton")}
        </Button>
      )}
    </div>
  );
}

export default Complete;
