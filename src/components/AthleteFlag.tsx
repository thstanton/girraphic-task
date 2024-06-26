import convertCountryCode from "../lib/isoMapping";

interface AthleteFlagProps {
  flag: string;
  countryname: string;
}

export default function AthleteFlag({ flag, countryname }: AthleteFlagProps) {
  if (convertCountryCode(flag)) {
    return (
      <img
        src={`https://flagcdn.com/32x24/${convertCountryCode(flag)}.png`}
        width="16"
        height="12"
        alt={`${countryname} flag`}
        className="mx-auto h-fit w-4"
      />
    );
  } else {
    return <span className="mx-auto h-fit w-4">{flag}</span>;
  }
}
