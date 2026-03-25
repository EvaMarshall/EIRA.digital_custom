import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Contact Me</h2>

      {!submitted ? (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full p-3 border rounded"
          />

          <input
            type="email"
            placeholder="Your email"
            className="w-full p-3 border rounded"
          />

          <textarea
            placeholder="Your message"
            className="w-full p-3 border rounded"
          />

          <button
            type="button"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Send
          </button>
        </form>
      ) : (
        <p className="text-green-600 font-semibold">Message sent!</p>
      )}
    </div>
  );
}
