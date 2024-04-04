import Image from "next/image";

interface TripHighlightsProps {
  highlights: string[];
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker mb-2">Destaques</h2>

      <div className="flex flex-wrap gap-y-3">
        {highlights.map((highlight) => (
          <div key={highlight} className="flex items-center w-1/2 gap-2">
            <Image
              src="/check-circle-icon.svg"
              alt="Ícone de círculo com um check"
              height={0}
              width={0}
              sizes="100vw"
              className="w-4 h-4"
            />

            <p className="text-xs text-primaryGray">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
