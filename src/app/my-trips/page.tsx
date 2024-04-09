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
    const response = await fetch(
      `http://localhost:3000/api/user/${userId}/trips`
    );

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
      <h1 className="text-xl font-semibold text-primaryDarker">
        Minhas Viagens
      </h1>

      {reservations.length <= 0 ? (
        <div className="flex flex-col items-center mt-5 gap-5">
          <p className="text-md text-primaryDarker font-medium">
            Nenhuma reserva encontrada!
          </p>

          <Link href="/" className="w-full">
            <Button className="w-full">Fazer Reserva</Button>
          </Link>
        </div>
      ) : (
        <>
          {reservations?.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              fetchReservations={fetchReservations}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default MyTrips;
