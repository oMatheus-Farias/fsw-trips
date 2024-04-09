"use client";

import { TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyTrips = () => {
  const [reservations, setReservations] = useState<TripReservation[]>([]);

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
    <div>
      <h1>My Trips</h1>
    </div>
  );
};

export default MyTrips;
