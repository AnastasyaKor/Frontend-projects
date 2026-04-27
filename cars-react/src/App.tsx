import { useState } from "react";
import "./App.css";
import { CarsSection } from "./components/CarsSection/CarsSection";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { OrderSection } from "./components/OrderSection/OrderSection";

function App() {
  const [selectedCar, setSelectedCar] = useState("");

  return (
    <div className="page-shell">
      <main className="main">
        <Header />
        <Hero />
      </main>

      <CarsSection onSelectCar={setSelectedCar} />
      <OrderSection selectedCar={selectedCar} />
      <Footer />
    </div>
  );
}

export default App;
