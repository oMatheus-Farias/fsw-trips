"use client";

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserReservationItem from "./components/user-reservation-item";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();

  const userId = (data?.user as any)?.id;

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${userId}/trips`
      );

      const _reservations = await response.json();
      setReservations(_reservations);
    };

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primaryDarker">
        Minhas Viagens
      </h1>

      {reservations?.map((reservation) => (
        <UserReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};

export default MyTrips;
