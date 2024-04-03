import TripItem from "@/components/trip-item";
import { prismaClient } from "@/lib/prisma";

const RecommendedTrips = async () => {
  const trips = await prismaClient.trip.findMany({
    where: {
      recommended: true,
    },
  });

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="h-[1px] w-full bg-grayLighter"></div>
        <h2 className="font-medium text-primaryGray min-w-fit px-5">
          Destinos Recomendados
        </h2>
        <div className="h-[1px] w-full bg-grayLighter"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-5">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
