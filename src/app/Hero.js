import React from "react";

function Hero() {
  const HERO_TEXT =
    "we are dedicated to providing top-notch services that go beyond just cleaning your car. Our team of experienced professionals uses the latest techniques and equipment to give your vehicle.";

  return (
    <section className="hero">
      <div className="hero__images--wrapper">
        <div className="hero__images--section hero__images--left">
          <div className="hero__images--top">
            <img src="./images/card 1.webp" alt="" className="n-1" />
            <img src="./images/card 2.webp" alt="" className="n-2" />
          </div>
          <img src="./images/card 3.webp" alt="" className="n-3" />
        </div>
        <div className="hero__content">
          <h1>Car Washing Online Booking Service</h1>
          <p className="hero__content--lg">{HERO_TEXT}</p>
        </div>
        <div className="hero__images--section hero__images--right">
          <img src="./images/card 4.webp" alt="" className="n-1" />
          <div className="hero__images--bottom">
            <img src="./images/card 5.webp" alt="" className="n-2" />
            <img src="./images/card 6.webp" alt="" className="n-3" />
          </div>
        </div>
      </div>
      <p className="hero__content--sm">{HERO_TEXT}</p>
    </section>
  );
}

export default Hero;
