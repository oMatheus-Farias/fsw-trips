"use client";

import TripItem from "@/components/trip-item";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}`
      );

      const _trips = await response.json();

      setTrips(_trips);
    };

    fetchTrips();
  }, []);

  return (
    <div className="container mx-auto flex flex-col p-5 items-center">
      <h1 className="text-primaryDarker font-semibold text-xl">
        Viagens Encontradas
      </h1>

      <h2 className="text-primaryGray font-medium mb-5">
        {trips.length > 0
          ? "Listamos as melhores viagens para você!"
          : "Não encontramos nada nos seus parâmetros de busca."}
      </h2>

      <div className="flex flex-col gap-4">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default TripsPage;
