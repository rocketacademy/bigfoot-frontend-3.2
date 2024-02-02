import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URL from "./Constants";
import { useEffect } from "react";

export default function QueryAll() {
  const fetcher = async (url) => (await axios.get(url)).data;

  const {
    data: sightings,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["sightings", `${BASE_URL}/sightings`],
    queryFn: () => fetcher(`${BASE_URL}/sightings`),
  });

  useEffect(() => {
    console.log(sightings);
  }, [sightings]);

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
        {sightings?.map((sighting) => (
          <li key={sighting.id}>
            <Link to={`/sightings/${sighting.id}`}>
              Date: {new Date(sighting?.date).toLocaleDateString()}, Location:{" "}
              {sighting?.location} Cateogries:{" "}
              {sighting?.categories?.map((category) => `${category.name} `)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
