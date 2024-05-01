import { useParams } from "react-router-dom";

export function useCountryId() {
  const { countryId } = useParams<{ countryId: string }>();
  if (!countryId) {
    throw new Error("Country ID not found");
  }

  return +countryId;
}
