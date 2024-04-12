import Button from "@/components/button";
import Image from "next/image";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0 lg:mt-12 lg:pb-20">
      <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">
        Localização
      </h2>

      <Image
        src="/map-mobile-image.png"
        alt={location}
        height={0}
        width={0}
        sizes="100vw"
        className="h-[280px] w-full object-cover rounded-lg shadow-md lg:hidden"
      />

      <Image
        src="/map-desktop-image.png"
        alt={location}
        height={0}
        width={0}
        sizes="100vw"
        className="hidden h-[480px] w-full object-cover rounded-lg shadow-md lg:block"
      />

      <h3 className="text-primaryDarker text-sm font-semibold mt-3 lg:text-base lg:mt-5">
        {location}
      </h3>
      <p className="text-xs text-primaryDarker mt-2 leading-5 lg:text-sm lg:mt-4">
        {locationDescription}
      </p>

      <Button variant="outlined" className="mt-5">
        Ver no Google Maps
      </Button>
    </div>
  );
};

export default TripLocation;
