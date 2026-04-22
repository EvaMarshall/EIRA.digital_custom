import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  // Basic sanitisation to prevent script/HTML injection
  const sanitize = (value) => {
    return value
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.email.trim()) newErrors.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email address.";

    if (!form.message.trim())
      newErrors.message = "Please enter a message.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFailed(false);

    if (!validate()) return;

    setLoading(true);

    const safeForm = {
      name: sanitize(form.name),
      email: sanitize(form.email),
      message: sanitize(form.message),
    };

    try {
      const res = await fetch("https://formsubmit.co/3177eff7779a172d617a29d3e2b74d2f", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safeForm),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setFailed(true);
      }
    } catch (err) {
      setFailed(true);
    }

    setLoading(false);
  };

  return (
    <section className="w-full bg-bgsecondary py-20">
      <div className="content-container py-10">
        <h1 className="text-4xl text-secondary text-center mb-10">
          Get in Touch
        </h1>

        <div className="max-w-prose mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Honeypot field */}
              <input
                type="text"
                name="_honey"
                style={{ display: "none" }}
                onChange={() => { }}
              />

              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-secondary text-lg">Name</label>
                <input
                  type="text"
                  name="name"
                  maxLength="200"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-bgprimary text-primary border border-secondary/30 rounded-md px-4 py-3 focus:outline-none focus:border-secondary"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2">
                <label className="text-secondary text-lg">Email</label>
                <input
                  type="email"
                  name="email"
                  maxLength="200"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-bgprimary text-primary border border-secondary/30 rounded-md px-4 py-3 focus:outline-none focus:border-secondary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-2">
                <label className="text-secondary text-lg">Message</label>
                <textarea
                  name="message"
                  rows="6"
                  maxLength="2000"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-bgprimary text-primary border border-secondary/30 rounded-md px-4 py-3 focus:outline-none focus:border-secondary"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-md text-lg transition ${loading
                    ? "opacity-50 cursor-not-allowed bg-[#D7B7C4] text-bgprimary"
                    : "bg-[#D7B7C4] text-bgprimary hover:opacity-80"
                  }`}
              >
                {loading ? "Sending…" : "Send Message"}
              </button>

              {failed && (
                <p className="text-red-500 text-sm mt-2">
                  Something went wrong — please try again.
                </p>
              )}
            </form>
          ) : (
            <p className="text-[#D7B7C4] text-xl text-center">
              Message sent — thank you!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
