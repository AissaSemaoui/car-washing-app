import Hero from "./components/Hero";
import Navbar from "./components/navbar/Navbar";

export default function Home({ params: { lng } }) {
  return (
    <>
      <Navbar lng={lng} />
      <Hero lng={lng} />
      <main></main>
    </>
  );
}
