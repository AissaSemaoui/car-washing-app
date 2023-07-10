import { sendPostRequest } from "./sendPostRquest";

export const validateStep = async (
  active,
  formData,
  setError,
  userDetailsForm,
  setFormData,
  setInvoiceUrl
) => {
  switch (active) {
    case 0:
      if (!formData?.selectedVehicle?.vehicletype) {
        setError("selectVehicleErr");
        return false;
      }
      return true;
      break;
    case 1:
      if (!formData?.selectedPackageId) {
        setError("selectPackageErr");
        return false;
      }
      return true;
      break;
    case 3:
      if (
        !formData?.scheduledDate?.hour ||
        !formData?.scheduledDate?.fullDate
      ) {
        setError("scheduleDateErr");
        return false;
      }
      return true;
      break;
    case 4:
      if (!formData.selectedPaymentMethod) {
        setError("paymentMethodErr");
        return false;
      }
      return await new Promise((resolve, reject) =>
        userDetailsForm.onSubmit(
          async (values) => {
            const bookingData = {
              vehicletype: formData.selectedVehicle?.vehicletype,
              packageId: formData.selectedPackageId,
              extraservicesId: formData.extraservicesId,
              firstname: values?.firstName,
              lastname: values?.lastName,
              phonenumber: values?.phoneNumber,
              area: values?.area,
              block: values?.block,
              avenue: values?.avenue,
              street: values?.street,
              house: values?.house,
              bookingDateTime: formData.scheduledDate?.fullDate,
            };

            const response = await sendPostRequest(
              `/api/booking/bookings`,
              bookingData
            );

            if (!response.success) {
              setError("bookingFailedErr");
              resolve(false);
            }

            if (
              response.newBooking &&
              formData.selectedPaymentMethod !== "Cash"
            ) {
              const transaction = await sendPostRequest(
                `/api/transaction/${response?.newBooking?._id}`,
                bookingData
              );

              if (transaction.success) {
                const parsedResponse = JSON.parse(transaction.response);
                setInvoiceUrl(parsedResponse.Data.Do_TxnHdr[0].InvcURl);
              } else {
                setError("generatingInvoiceFailedErr");
              }
            }

            setFormData((prev) => ({ ...prev, userDetails: values }));
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        )()
      );

      return false;
      break;
    default:
      return true;
  }
  return true;
};
