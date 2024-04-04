import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import TripHeader from "./components/trip-header";

interface TripDetailsPageProps {
  params: {
    tripId: string;
  };
}

const TripDetailsPage = async ({ params }: TripDetailsPageProps) => {
  const trip = await prismaClient.trip.findUnique({
    where: {
      id: params.tripId,
    },
  });

  if (!trip) {
    return (
      <div className="container mx-auto w-full flex justify-center items-center">
        <p>Viagem não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
    </div>
  );
};

export default TripDetailsPage;
