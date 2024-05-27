import girraphicLogo from "../assets/girraphic-logo.png";

export default function Header() {
  return (
    <div className="flex h-28 items-center gap-4 bg-slate-950 p-4">
      <div>
        <img src={girraphicLogo} alt="Girraphic Logo" className="w-44" />
      </div>
      <h1 className="font-montserrat border-l-[1px] border-solid border-amber-400 pl-4 text-xl font-light uppercase text-amber-400">
        Media Information System
      </h1>
    </div>
  );
}
