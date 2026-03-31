import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "@/services/api";
import { Destination } from "@/constants/destinations";

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/tours")
      .then(res => {
        // Map _id to id if necessary
        const tours = res.data.map((tour: { _id: string;[key: string]: unknown }) => ({ ...tour, id: tour._id }));
        setDestinations(tours);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading destinations...</div>;

  return (
    <div className="p-6 space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">All Destinations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d) => (
          <Link
            key={d.id}
            to={`/destination/${d.id}`}
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img src={d.image} alt={d.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{d.name}</h2>
              <p className="text-gray-600 truncate">{d.description}</p>
              <p className="mt-2 font-bold text-india-blue">₹{d.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}