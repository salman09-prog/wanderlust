import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Saving booking...");

  useEffect(() => {
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("Invalid session");
      return;
    }

    fetch("http://localhost:5000/save-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })
      .then(() => {
        setStatus("Booking Confirmed 🎉");
        // Auto-redirect after 3 seconds
        setTimeout(() => navigate('/'), 3000);
      })
      .catch(() => setStatus("Booking save failed"));
  }, [navigate, params]);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-black text-white">
      <h1 className="text-4xl font-bold text-green-500 pt-8 mt-[-10vh]">Payment Successful!</h1>
      <p className="text-xl text-zinc-300">{status}</p>

      {status.includes("Confirmed") && (
        <p className="text-zinc-500 text-sm animate-pulse">Redirecting to home shortly...</p>
      )}

      <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700 text-white mt-8 px-8 py-2 text-lg font-semibold rounded-xl">
        Return to Home Now
      </Button>
    </div>
  );
}