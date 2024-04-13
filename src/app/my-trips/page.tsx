"use client";

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserReservationItem from "./components/user-reservation-item";
import Button from "@/components/button";
import Link from "next/link";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();

  const userId = (data?.user as any)?.id;

  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(`/api/user/${userId}/trips`);

    const _reservations = await response.json();
    setReservations(_reservations);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primaryDarker lg:mb-5">
        Minhas Viagens
      </h1>

      {reservations.length <= 0 ? (
        <div className="flex flex-col items-center mt-5 gap-5 lg:max-w-[400px] lg:mx-auto">
          <p className="text-md text-primaryDarker font-medium">
            Nenhuma reserva encontrada!
          </p>

          <Link href="/" className="w-full lg:mt-5">
            <Button className="w-full">Fazer Reserva</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-14">
          {reservations?.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              fetchReservations={fetchReservations}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
