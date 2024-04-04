import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

interface TripHeaderProps {
  trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className="flex flex-col">
      <Image
        src={trip?.coverImage}
        alt={trip?.name}
        height={0}
        width={0}
        sizes="100vw"
        className="h-[300px] w-full object-cover"
      />

      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-xl text-primaryDarker">
          {trip.name}
        </h1>

        <div className="flex items-center gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-primaryGray underline">{trip.location}</p>
        </div>

        <p className="text-primary font-medium text-xs">
          R$ {Number(trip.pricePerDay).toFixed(2)}{" "}
          <span className="text-primaryGray">por dia</span>
        </p>
      </div>
    </div>
  );
};

export default TripHeader;
