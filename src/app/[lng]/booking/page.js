import Hero from "../components/Hero";
import Navbar from "../components/navbar/Navbar";
import MainStepper from "./MainStepper";

function Booking({ params: { lng } }) {
  return (
    <>
      <Navbar lng={lng} />
      <Hero lng={lng} />
      <MainStepper lng={lng} />;
    </>
  );
}

export default Booking;
