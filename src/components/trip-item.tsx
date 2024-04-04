import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface TripItemProps {
  trip: Trip;
}

const TripItem = ({ trip }: TripItemProps) => {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex flex-col">
        <Image
          src={trip.coverImage}
          alt={trip.name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-[280px] w-[280px] rounded-lg shadow-sm object-cover"
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-primaryDarker font-medium text-sm mt-2">
            {trip.name}
          </h3>
          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={trip.countryCode} svg />
            <p className="text-xs text-primaryGray">{trip.location}</p>
          </div>

          <p className="text-primary font-medium text-xs">
            R$ {Number(trip.pricePerDay).toFixed(2)}{" "}
            <span className="text-primaryGray">por dia</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TripItem;
