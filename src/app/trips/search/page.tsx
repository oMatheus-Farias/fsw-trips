"use client";

import TripItem from "@/components/trip-item";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

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
    <Suspense>
      <div className="container mx-auto flex flex-col p-5 items-center lg:items-start">
        <h1 className="text-primaryDarker font-semibold text-xl lg:text-[2.5em] lg:w-full text-left">
          Viagens Encontradas
        </h1>

        <h2 className="text-primaryGray font-medium mb-5 lg:mt-6 lg:w-full text-left">
          {trips.length > 0
            ? "Listamos as melhores viagens para você!"
            : "Não encontramos nada nos seus parâmetros de busca."}
        </h2>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-10 lg:mt-6 lg:pb-16">
          {trips.map((trip) => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default TripsPage;
