import { useState } from "react";

export default function PricingCalculator() {
  const [price, setPrice] = useState(0);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Pricing Calculator</h2>
      <p className="text-xl font-semibold">€{price}</p>
    </div>
  );
}
