import { type FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [bringingGuests, setBringingGuests] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Event RSVP</p>
          <h1>Confirm your spot for the celebration</h1>
          <p className="hero-text">
            Share your details so the host can plan seating, meals, and guest
            access without last-minute surprises.
          </p>
        </div>

        <form className="form-wrap" onSubmit={handleSubmit}>
          <label className="section">
            <span>Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Smith"
            />
          </label>

          <label className="section">
            <span>Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jane@example.com"
            />
          </label>

          <label className="section">
            <span>Number of attendees</span>
            <input
              type="number"
              required
              min="1"
              value={attendeesCount}
              onChange={(event) =>
                setAttendeesCount(Number(event.target.value) || 1)
              }
            />
          </label>

          <label className="section">
            <span>Dietary preferences</span>
            <input
              type="text"
              value={dietaryPreferences}
              onChange={(event) => setDietaryPreferences(event.target.value)}
              placeholder="Vegetarian, nut-free, no preferences..."
            />
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={bringingGuests}
              onChange={(event) => setBringingGuests(event.target.checked)}
            />
            <span>I'm bringing additional guests</span>
          </label>

          <button
            type="submit"
            className="submit-button"
            disabled={!name || !email || attendeesCount < 1}
          >
            Submit RSVP
          </button>
        </form>

        {isSubmitted && (
          <section className="confirmation-message" aria-live="polite">
            <h2>RSVP submitted</h2>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Attendees:</strong> {attendeesCount}
            </p>
            <p>
              <strong>Dietary preferences:</strong>{" "}
              {dietaryPreferences.trim() || "None"}
            </p>
            <p>
              <strong>Additional guests:</strong>{" "}
              {bringingGuests ? "Yes" : "No"}
            </p>
          </section>
        )}
      </section>
    </main>
  );
}

export default App;
