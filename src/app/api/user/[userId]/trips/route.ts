import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) => {
  if (!userId) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "MISSING_USER_ID",
        },
      })
    );
  }

  const reservations = await prismaClient.tripReservation.findMany({
    where: {
      userId,
    },
    include: {
      trip: true,
    },
  });

  return new NextResponse(JSON.stringify(reservations), {
    status: 200,
  });
};
