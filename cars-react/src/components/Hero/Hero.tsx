import mainCar from "../../assets/images/main-car.png";

export function Hero() {
  return (
    <section className="main-content" id="top">
      <div className="container">
        <div className="main-info">
          <span className="eyebrow">Премиальная аренда в Дубае</span>
          <h1>Покорите дороги за рулем легендарных автомобилей</h1>

          <p>
            От эксклюзивных спорткаров до узнаваемой автомобильной классики:
            выбирайте модель под настроение, бронируйте за пару минут и
            получайте сервис без лишней бюрократии.
          </p>

          <a href="#cars" className="button" id="main-action-button">
            Посмотреть автомобили
          </a>
        </div>

        <img src={mainCar} alt="Спортивный автомобиль" className="main-image" />
      </div>
    </section>
  );
}
