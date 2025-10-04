import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ClassSelection from "@/components/ClassSelection";
import Impact from "@/components/Impact";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <Hero />
      <ClassSelection />
      <Impact />
    </Container>
  );
}
