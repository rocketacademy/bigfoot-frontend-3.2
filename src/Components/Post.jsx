import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "./Constants";

export default function Post() {
  const navigate = useNavigate();

  const fetcher = async (url) => (await axios.get(url)).data;
  const postNav = async (url, data) => {
    const res = await axios.post(url, data);
    navigate(`/sightings/${res.data.id}`);
    return res;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: categories } = useQuery({
    queryKey: ["categories", `${BASE_URL}/categories`],
    queryFn: () => fetcher(`${BASE_URL}/categories`),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (formData) => postNav(`${BASE_URL}/sightings`, formData),
  });

  const onSubmit = (formData) => mutate(formData);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Date: </label>
        <input
          type="datetime-local"
          {...register("date", { required: "Input date" })}
          placeholder="Date"
        />
        <br />
        {errors?.date?.message}
        <br />
        <label>Location: </label>
        <input
          type="text"
          {...register("location", { required: "Input location" })}
          placeholder="Location"
        />
        <br />
        {errors?.location?.message}
        <br />
        <label>Notes: </label>
        <input
          type="text"
          {...register("notes", { required: "Input notes" })}
          placeholder="Notes"
        />
        <br />
        {errors?.notes?.message}
        <br />
        <label>Categories: </label>
        <select
          multiple
          {...register("selectedCategoryIds", {
            required: "Select a category",
          })}>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br />
        {errors?.categories?.message}
        <br />
        <button>Submit</button>
      </form>

      {isPending && <>Loading...</>}
      {isError && <>{error.message}</>}
    </>
  );
}
