import logo from "../../assets/images/logo.png";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <a className="logo" href="#top" aria-label="Luxury Cars">
          <img src={logo} alt="Luxury Cars" />
        </a>

        <div className="rights">Все права защищены</div>
      </div>
    </footer>
  );
}
