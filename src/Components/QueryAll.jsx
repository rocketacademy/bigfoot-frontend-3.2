import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "./Constants";

export default function QueryAll() {
  const fetcher = async (url) => (await axios.get(url)).data;

  const {
    data: sightings,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["sightings", BASE_URL],
    queryFn: () => fetcher(BASE_URL),
  });

  if (isPending) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error: {error.message}</>;
  }

  return (
    <>
      Sightings:
      <ul>
        {sightings?.map((sighting, index) => (
          <li key={index}>
            <Link to={`/sightings/${index}`}>
              Year: {sighting?.YEAR}, Season: {sighting?.SEASON}, Month:{" "}
              {sighting.MONTH ?? "N/A"}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
