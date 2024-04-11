"use client";

import Button from "@/components/button";
import { Trip } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

interface ConfirmationPageProps {
  params: {
    tripId: string;
  };
}

const ConfirmationPage = ({ params }: ConfirmationPageProps) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const router = useRouter();

  const { status, data } = useSession();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch("http://localhost:3000/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          tripId: params.tripId,
        }),
      });

      const res = await response.json();

      if (res?.error) {
        return router.push("/");
      }

      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };

    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchTrip();
  }, [status]);

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");

  if (!trip) {
    return null;
  }

  const handleBuyClick = async () => {
    const res = await fetch("http://localhost:3000/api/payment", {
      method: "POST",
      body: JSON.stringify({
        tripId: params.tripId,
        startDate: searchParams.get("startDate"),
        endDate: searchParams.get("endDate"),
        guests: Number(searchParams.get("guests")),
        totalPrice,
        coverImage: trip.coverImage,
        name: trip.name,
        description: trip.description,
      }),
    });

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao realizar a reserva!", {
        position: "bottom-center",
      });
    }

    const { sessionId } = await res.json();

    const strip = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

    await strip?.redirectToCheckout({ sessionId });

    // router.push("/");

    toast.success("Reserva realizada com sucesso!", {
      position: "bottom-center",
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

      <div className="flex flex-col p-5 mt-5 border border-solid border-grayLighter shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-solid border-grayLighter">
          <Image
            src={trip.coverImage}
            alt={trip.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-[106px] w-[124px] object-cover rounded-lg"
          />

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-primaryGray underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-primaryDarker mt-3">
          Informações sobre o preço
        </h3>

        <div className="flex justify-between mt-1">
          <p className="text-primaryDarker">Total:</p>
          <p className="font-medium text-primaryDarker">
            R$ {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="font-semibold">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
