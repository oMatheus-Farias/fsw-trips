"use client";

import Button from "@/components/button";
import DatePicker from "@/components/date-picker";
import Input from "@/components/input";
import { Trip } from "@prisma/client";

interface TripReservationProps {
  trip: Trip;
}

const TripReservation = ({ trip }: TripReservationProps) => {
  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <DatePicker
          placeholderText="Data de Início"
          onChange={() => {}}
          className="w-full"
        />
        <DatePicker
          placeholderText="Data Final"
          onChange={() => {}}
          className="w-full"
        />
      </div>

      <Input
        placeholder={`Número de hóspedes (max: ${trip?.maxGuests})`}
        className="mt-4"
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total:</p>
        <p className="font-medium text-sm text-primaryDarker">R$ 2500.00</p>
      </div>

      <Button className="mt-3">Reservar Agora</Button>
    </div>
  );
};

export default TripReservation;
