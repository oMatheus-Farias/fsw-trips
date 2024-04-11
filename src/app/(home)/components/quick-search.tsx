import Image from "next/image";
import Link from "next/link";

const QuickSearch = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex items-center">
        <div className="h-[1px] w-full bg-grayLighter"></div>
        <h2 className="font-medium text-primaryGray min-w-fit px-5">
          Tente pesquisar por
        </h2>
        <div className="h-[1px] w-full bg-grayLighter"></div>
      </div>

      <div className="flex w-full justify-between mt-4">
        <Link href="/trips/search?text=hotel">
          <div className="flex flex-col items-center">
            <Image
              src="/hotel-icon.png"
              alt="Hotel"
              height={0}
              width={0}
              sizes="100vw"
              className="h-9 w-9"
            />

            <p className="text-sm text-primaryGray">Hotéis</p>
          </div>
        </Link>

        <Link href="/trips/search?text=fazenda">
          <div className="flex flex-col items-center">
            <Image
              src="/farm-icon.png"
              alt="Hotel"
              height={0}
              width={0}
              sizes="100vw"
              className="h-9 w-9"
            />

            <p className="text-sm text-primaryGray">Fazendas</p>
          </div>
        </Link>

        <Link href="/trips/search?text=chalé">
          <div className="flex flex-col items-center">
            <Image
              src="/chalets-icon.png"
              alt="Hotel"
              height={0}
              width={0}
              sizes="100vw"
              className="h-9 w-9"
            />

            <p className="text-sm text-primaryGray">Chalés</p>
          </div>
        </Link>

        <Link href="/trips/search?text=pousada">
          <div className="flex flex-col items-center">
            <Image
              src="/inns-icon.png"
              alt="Hotel"
              height={0}
              width={0}
              sizes="100vw"
              className="h-9 w-9"
            />

            <p className="text-sm text-primaryGray">Pousadas</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuickSearch;
