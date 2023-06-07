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
      if (!formData?.selectedVehicle) {
        setError("Please select a vehicle");
        return false;
      }
      return true;
      break;
    case 1:
      if (!formData?.selectedPackageId) {
        setError("Please select a package");
        return false;
      }
      return true;
      break;
    case 3:
      if (!formData?.scheduledDate.hour) {
        setError("Please schedule a date");
        return false;
      }
      return true;
      break;
    case 4:
      if (!formData.selectedPaymentMethod) {
        setError("Please select a payment method");
        return false;
      }
      return new Promise((resolve, reject) =>
        userDetailsForm.onSubmit(async (values) => {
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
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/bookings`,
            bookingData
          );

          if (!response.success) {
            setError("Booking Failed!, Please try again");
            reject(false);
          }

          if (
            response.newBooking &&
            formData.selectedPaymentMethod !== "Cash"
          ) {
            const transaction = await sendPostRequest(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/${response?.newBooking?._id}`,
              bookingData
            );

            if (transaction.success) {
              const parsedResponse = JSON.parse(transaction.response);
              setInvoiceUrl(parsedResponse.Data.Do_TxnHdr[0].InvcURl);
            } else {
              setError("Generating Invoice Failed!");
            }
          }

          setFormData((prev) => ({ ...prev, userDetails: values }));
          resolve(true);
        })()
      );

      return false;
      break;
    default:
      return true;
  }
  return true;
};
