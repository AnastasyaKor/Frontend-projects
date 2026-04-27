import { useState } from "react";
import orderCar from "../../assets/images/order-car.png";

type OrderForm = {
  name: string;
  phone: string;
};

type TouchedFields = {
  car: boolean;
  name: boolean;
  phone: boolean;
};

type OrderSectionProps = {
  selectedCar: string;
};

export function OrderSection({ selectedCar }: OrderSectionProps) {
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: "",
    phone: "",
  });
  const [touched, setTouched] = useState<TouchedFields>({
    car: false,
    name: false,
    phone: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const selectedCarValue = selectedCar.trim();

  function handleInputChange(fieldName: keyof OrderForm, value: string) {
    setSubmitMessage("");
    setSubmitError("");

    setOrderForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  }

  function handleBlur(fieldName: keyof TouchedFields) {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [fieldName]: true,
    }));
  }

  function isError(fieldName: keyof TouchedFields) {
    const value =
      fieldName === "car" ? selectedCarValue : orderForm[fieldName].trim();

    if (!touched[fieldName]) {
      return false;
    }

    if (fieldName === "phone") {
      return value.replace(/\D/g, "").length < 10;
    }

    return value.length === 0;
  }

  function isFormValid() {
    return (
      selectedCarValue.length > 0 &&
      orderForm.name.trim().length > 0 &&
      orderForm.phone.replace(/\D/g, "").length >= 10
    );
  }

  async function sendOrder() {
    if (!isFormValid()) {
      setTouched({
        car: true,
        name: true,
        phone: true,
      });
      setSubmitError("Заполните форму корректно, и мы сразу свяжемся с вами.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const response = await fetch("https://testologia.ru/cars-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderForm,
          car: selectedCarValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка при бронировании");
      }

      setSubmitMessage(data.message || "Заявка отправлена. Мы скоро перезвоним.");
      setOrderForm({
        name: "",
        phone: "",
      });
      setTouched({
        car: false,
        name: false,
        phone: false,
      });
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Не удалось отправить заявку. Попробуйте позже.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="order section-anchor" id="order">
      <div className="container">
        <div className="order-visual">
          <img src={orderCar} alt="Автомобиль для бронирования" />
        </div>

        <form className="order-card">
          <span className="eyebrow">Быстрое бронирование</span>
          <h3>Забронируйте автомобиль</h3>

          <p>
            Оставьте контакты, и мы уточним детали аренды, подберем удобное
            время подачи и подтвердим бронь.
          </p>

          <div className="order-form">
            <input
              type="text"
              placeholder="Автомобиль"
              required
              readOnly
              id="car"
              value={selectedCarValue}
              onBlur={() => handleBlur("car")}
              className={isError("car") ? "error" : ""}
            />

            <input
              type="text"
              placeholder="Ваше имя"
              required
              id="name"
              value={orderForm.name}
              onChange={(event) => handleInputChange("name", event.target.value)}
              onBlur={() => handleBlur("name")}
              className={isError("name") ? "error" : ""}
            />

            <input
              type="tel"
              placeholder="Ваш телефон"
              required
              id="phone"
              value={orderForm.phone}
              onChange={(event) => handleInputChange("phone", event.target.value)}
              onBlur={() => handleBlur("phone")}
              className={isError("phone") ? "error" : ""}
            />

            <button
              className="button"
              type="button"
              id="order-action"
              onClick={sendOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправляем..." : "Забронировать"}
            </button>
          </div>

          {submitMessage && <div className="form-message success">{submitMessage}</div>}
          {submitError && <div className="form-message error">{submitError}</div>}
        </form>
      </div>
    </section>
  );
}
