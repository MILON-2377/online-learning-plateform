
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useClassesDataLoading(email,page,search) {
  const dataFatching = async () => {
    // const filters = FiltersItemsCatch();
    // const queryString = `filters=${encodeURIComponent(
    //   JSON.stringify(filters)
    // )}`;

    const limit = 10;

    try {
      const res = await axios.get(
        `/api/create-class?email=${email}&page=${page}&limit=${limit}&search=${search}`
      );

      return res.data;
    } catch (error) {
      return error.message;
    }
  };

  const { data: classesData = [], refetch, isLoading } = useQuery({
    queryKey: ["classesData"],
    queryFn: () => dataFatching(),
    enabled: !!email,
  });

  return { classesData, refetch, isLoading };
}
