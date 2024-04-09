import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (
  _request: Request,
  { params: { reservationId } }: { params: { reservationId: string } }
) => {
  if (!reservationId) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "MISSING_RESERVATION_ID",
        },
      })
    );
  }

  const reservationDeleted = await prismaClient.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return new NextResponse(JSON.stringify(reservationDeleted), { status: 200 });
};
