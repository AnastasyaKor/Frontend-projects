import logo from "../../assets/images/logo.png";

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <a className="logo" href="#top" aria-label="Luxury Cars">
          <img src={logo} alt="Luxury Cars" />
        </a>

        <nav className="menu" aria-label="Основное меню">
          <ul>
            <li>
              <a href="#cars">Наш автопарк</a>
            </li>
            <li>
              <a href="#order">Забронировать</a>
            </li>
          </ul>
        </nav>

        <a href="tel:+971523898989" className="phone">
          +971 52 389 89 89
        </a>
      </div>
    </header>
  );
}
