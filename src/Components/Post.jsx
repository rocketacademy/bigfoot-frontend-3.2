import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "./Constants";

export default function Post() {
  const navigate = useNavigate();

  const poster = async (url, data) => {
    const res = await axios.post(url, data);
    navigate(`/sightings/${res.data.id}`);
    return res;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (formData) => poster(BASE_URL, formData),
  });

  const onSubmit = (formData) => mutate(formData);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="datetime-local"
          {...register("date", { required: "Input date" })}
          placeholder="Date"
        />
        <br />
        {errors?.date?.message}
        <br />
        <input
          type="text"
          {...register("location", { required: "Input location" })}
          placeholder="Location"
        />
        <br />
        {errors?.location?.message}
        <br />
        <input
          type="text"
          {...register("notes", { required: "Input notes" })}
          placeholder="Notes"
        />
        <br />
        {errors?.notes?.message}
        <br />
        <button>Submit</button>
      </form>

      {isPending && <>Loading...</>}
      {isError && <>{error.message}</>}
    </>
  );
}
