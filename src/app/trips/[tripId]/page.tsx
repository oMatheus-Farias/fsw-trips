import { prismaClient } from "@/lib/prisma";
import TripHeader from "./components/trip-header";
import TripReservation from "./components/trip-reservation";
import TripDescription from "./components/trip-description";
import TripHighlights from "./components/trip-highlights";
import TripLocation from "./components/trip-location";

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
    <div className="container mx-auto lg:px-40 lg:pt-10">
      <TripHeader trip={trip} />
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
            maxGuests={trip.maxGuests}
            pricePerDay={Number(trip.pricePerDay)}
            tripId={trip.id}
          />
        </div>
        <div className="lg:order-1">
          <TripDescription description={trip.description} />
          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetailsPage;
