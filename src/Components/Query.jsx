import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BASE_URL from "./Constants";

export default function Query() {
  const [sightingIndex, setSightingIndex] = useState("");

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  useEffect(() => {
    setSightingIndex(params.sightingId);
  }, [params.sightingId]);

  const fetcher = async (url) => (await axios.get(url)).data;
  const {
    data: sighting,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["sighting", `${BASE_URL}/${sightingIndex}`],
    queryFn: () => fetcher(`${BASE_URL}/${sightingIndex}`),
  });

  if (isPending) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error: {error.message}</>;
  }

  return (
    <>
      Sighting {params.sightingId}: <br />
      <ul>
        {Object.keys(sighting).map((key) => (
          <li key={key}>
            {key}: {`${sighting[key]}`}
          </li>
        ))}
      </ul>
    </>
  );
}
