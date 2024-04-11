"use client";

import Button from "@/components/button";
import CurrencyInput from "@/components/currency-input";
import DatePicker from "@/components/date-picker";
import Input from "@/components/input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface TripSearchForm {
  text: string;
  startDate: Date | null;
  budget: number;
}

const TripSearch = () => {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchForm>();

  const onSubmit = (data: TripSearchForm) => {
    router.push(
      `/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`
    );
  };

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="text-2xl font-semibold text-primaryDarker text-center">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
        <Input
          placeholder="Onde você quer ir?"
          autoComplete="off"
          {...register("text", {
            required: {
              value: true,
              message: "Campo obrigatório.",
            },
          })}
          error={!!errors.text}
          errorMessage={errors.text?.message}
        />

        <div className="flex gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data Inicial"
                className="w-full"
                onChange={field.onChange}
                selected={field.value}
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                onValueChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                allowDecimals={false}
              />
            )}
          />
        </div>

        <Button onClick={() => handleSubmit(onSubmit)()}>Buscar</Button>
      </div>
    </div>
  );
};

export default TripSearch;
