"use client";

import Button from "@/components/button";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  const router = useRouter();

  const handleDeleteClick = async (reservationId: string) => {
    try {
      await fetch(
        `http://localhost:3000/api/trips/reservation/${reservationId}`,
        {
          method: "DELETE",
        }
      );

      toast.success("Reserva cancelada com sucesso!", {
        position: "bottom-center",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar a reserva, tente novamente mais tarde.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col p-5 mt-5 border border-solid border-grayLighter shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-solid border-grayLighter">
          <Image
            src={reservation.trip.coverImage}
            alt={reservation.trip.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-[106px] w-[124px] object-cover rounded-lg"
          />

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {reservation.trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag
                countryCode={reservation.trip.countryCode}
                svg
              />
              <p className="text-xs text-primaryGray underline">
                {reservation.trip.location}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm">Data</h3>
          <div className="flex items-center gap-1">
            <p className="text-sm">
              {format(reservation.startDate, "dd 'de' MMMM", { locale: ptBR })}
            </p>
            {" - "}
            <p className="text-sm">
              {format(reservation.endDate, "dd 'de' MMMM", { locale: ptBR })}
            </p>
          </div>

          <h3 className="mt-5 text-sm">Hóspedes</h3>
          <p className="text-sm pb-5">{reservation.guests} hóspedes</p>

          <h3 className="font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">
            Informações sobre o preço
          </h3>

          <div className="flex justify-between mt-2">
            <p className="text-primaryDarker text-sm">Total:</p>
            <p className="font-medium text-primaryDarker text-sm">
              R$ {Number(reservation.totalPaid).toFixed(2)}
            </p>
          </div>

          <Button
            variant="danger"
            className="mt-5"
            onClick={() => handleDeleteClick(reservation.id)}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserReservationItem;
