"use client";

import Button from "@/components/button";
import DatePicker from "@/components/date-picker";
import Input from "@/components/input";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  maxGuests: number;
  tripStartDate: Date;
  tripEndDate: Date;
  pricePerDay: number;
  tripId: string;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  maxGuests,
  tripStartDate,
  tripEndDate,
  pricePerDay,
  tripId,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const router = useRouter();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: JSON.stringify({
        startDate: data.startDate,
        endDate: data.endDate,
        tripId,
      }),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Está data já está reservada.",
      });

      return setError("endDate", {
        type: "manual",
        message: "Está data já está reservada.",
      });
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }

    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`
    );
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="flex flex-col px-5 lg:min-w-[380px] lg:p-5 lg:border-grayLighter lg:border lg:rounded-lg lg:shadow-md">
      <p className="hidden text-xl text-primaryDarker mb-4 lg:block">
        <span className="font-semibold">R$ {pricePerDay.toFixed(2)}</span> por
        dia
      </p>

      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data de início é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data de Início"
              className="w-full"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              minDate={tripStartDate}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data Final"
              className="w-full"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório.",
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes deve ser no máximo ${maxGuests}.`,
          },
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        type="number"
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total:</p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate
            ? `R$ ${(differenceInDays(endDate, startDate) * pricePerDay).toFixed(2)}`
            : "R$ 0.00"}
        </p>
      </div>

      <div className="pb-10 border-b border-grayLighter lg:border-none lg:pb-0">
        <Button
          className="mt-3 w-full"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Reservar Agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
