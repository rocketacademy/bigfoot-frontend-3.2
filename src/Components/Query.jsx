import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BASE_URL from "./Constants";

export default function Query() {
  const queryClient = useQueryClient();
  const params = useParams();
  const [sightingId, setsightingId] = useState(params.sightingId);

  // Update sighting index in state if needed to trigger data retrieval

  useEffect(() => {
    setsightingId(params.sightingId);
  }, [params.sightingId]);

  const fetcher = async (url) => (await axios.get(url)).data;
  const poster = async (url, data) => await axios.post(url, data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sighting = useQuery({
    queryKey: ["sighting", `${BASE_URL}/sightings/${sightingId}`],
    queryFn: () => fetcher(`${BASE_URL}/sightings/${sightingId}`),
  });

  const comments = useQuery({
    queryKey: ["comments", `${BASE_URL}/sightings/${sightingId}`],
    queryFn: () => fetcher(`${BASE_URL}/sightings/${sightingId}/comments`),
  });

  const { mutate } = useMutation({
    mutationFn: (formData) =>
      poster(`${BASE_URL}/sightings/${sightingId}/comments`, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments", `${BASE_URL}/sightings/${sightingId}`],
      }),
  });

  const onSubmit = (formData) => mutate(formData);

  if (sighting.isPending) {
    return <>Loading...</>;
  }

  if (sighting.isError) {
    return <>Error: {sighting?.error?.message}</>;
  }

  return (
    <>
      <h2>Sighting {params.sightingId}:</h2>
      <ul>
        {Object.keys(sighting.data).map((key) => (
          <li key={key}>
            {key}: {`${sighting.data[key]}`}
          </li>
        ))}
      </ul>
      <br />
      {comments.isPending && <>Loading...</>}
      {comments.isError && <>Error: {comments?.error?.message}</>}
      <h2>Comments:</h2>
      <ul>
        {comments.isSuccess &&
          comments?.data.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("content", { required: "Comment Empty" })}
          placeholder="Type in comment"
        />
        <br />
        {errors?.content?.message}
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}
