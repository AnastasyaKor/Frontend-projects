import { useEffect, useRef, useState } from "react";
import type { Car } from "../../types/car";

type Filter = {
  active: boolean;
  name: string;
};

type CarsSectionProps = {
  onSelectCar: (carTitle: string) => void;
};

const ALL_BRANDS_LABEL = "Все марки";

const initialFilters: Filter[] = [
  { active: true, name: ALL_BRANDS_LABEL },
  { active: false, name: "Lamborghini" },
  { active: false, name: "Ferrari" },
  { active: false, name: "Porsche" },
  { active: false, name: "BMW" },
  { active: false, name: "Mercedes" },
  { active: false, name: "Chevrolet" },
  { active: false, name: "Audi" },
  { active: false, name: "Ford" },
];

const pricePeriods = ["На 1 сутки", "На 1-3 суток", "На 3+ суток"];

export function CarsSection({ onSelectCar }: CarsSectionProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [carsFilter, setCarsFilter] = useState<Filter[]>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const carsContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void getCars("");
  }, []);

  async function getCars(filter: string) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://testologia.ru/cars-data?filter=${encodeURIComponent(filter)}`
      );

      if (!response.ok) {
        throw new Error("Не удалось загрузить список автомобилей.");
      }

      const data: Car[] = await response.json();
      setCars(data);
    } catch {
      setCars([]);
      setError("Не удалось загрузить автомобили. Попробуйте обновить страницу.");
    } finally {
      setIsLoading(false);
    }
  }

  function changeFilter(selectedFilter: Filter) {
    setCarsFilter((prevFilters) =>
      prevFilters.map((filter) => ({
        ...filter,
        active: filter.name === selectedFilter.name,
      }))
    );

    const filterValue =
      selectedFilter.name === ALL_BRANDS_LABEL ? "" : selectedFilter.name;

    void getCars(filterValue);

    carsContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="cars section-anchor" id="cars">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Каталог</span>
          <h2>Выберите автомобиль под свой стиль поездки</h2>
        </div>

        <div className="cars-content" id="cars-content" ref={carsContentRef}>
          <aside className="cars-filter">
            <div className="cars-filter-inner">
              <p className="cars-filter-title">Марки автомобилей</p>

              <ul>
                {carsFilter.map((filter) => (
                  <li key={filter.name}>
                    <button
                      type="button"
                      className={filter.active ? "active" : ""}
                      onClick={() => changeFilter(filter)}
                      aria-pressed={filter.active}
                    >
                      {filter.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="cars-items" aria-live="polite">
            {isLoading && <div className="cars-state">Загружаем автомобили...</div>}

            {!isLoading && error && <div className="cars-state error-state">{error}</div>}

            {!isLoading &&
              !error &&
              cars.map((car) => (
                <article className="car" key={car.title}>
                  <img src={car.image} alt={car.title} />

                  <div className="car-details">
                    <h4>{car.title}</h4>
                    <p>{car.text}</p>

                    <div className="car-action">
                      <ul>
                        {pricePeriods.map((period, index) => (
                          <li key={period}>
                            <div className="car-period">{period}</div>
                            <div className="car-price">
                              {car.prices[index]} $ {index > 0 && <span>/сутки</span>}
                            </div>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#order"
                        className="button white-button"
                        onClick={() => onSelectCar(car.title)}
                      >
                        Забронировать
                      </a>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
