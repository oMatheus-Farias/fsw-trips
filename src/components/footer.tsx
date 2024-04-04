import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-walterWhite p-5 gap-1 flex flex-col justify-center items-center">
      <Image
        src="/logo.svg"
        alt="Full Stack Week"
        height={0}
        width={0}
        sizes="100vw"
        className="h-6 w-[133px]"
      />

      <p className="text-sm font-medium text-primaryDarker">
        Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
