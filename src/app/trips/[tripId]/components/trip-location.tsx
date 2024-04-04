import Button from "@/components/button";
import Image from "next/image";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>

      <Image
        src="/map-mobile-image.png"
        alt={location}
        height={0}
        width={0}
        sizes="100vw"
        className="h-[280px] w-full object-cover rounded-lg shadow-md"
      />

      <h3 className="text-primaryDarker text-sm font-semibold mt-3">
        {location}
      </h3>
      <p className="text-xs text-primaryDarker mt-2 leading-5">
        {locationDescription}
      </p>

      <Button variant="outlined" className="mt-5">
        Ver no Google Maps
      </Button>
    </div>
  );
};

export default TripLocation;
