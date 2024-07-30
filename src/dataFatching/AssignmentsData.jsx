"use client";

import FiltersItemsCatch from "@/Hooks/useFiltersItemsCatch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAssignmentsData(page) {
  const dataFatching = async () => {
    const filters = FiltersItemsCatch();
    const queryString = `filters=${encodeURIComponent(
      JSON.stringify(filters)
    )}`;

    const limit = 10;
    try {
      const res = await axios.get(
        `/api/create-assignments?page=${page}&limit=${limit}&${queryString}`
      );

      return res.data;
    } catch (error) {
      return error.message;
    }
  };

  const { data: assignmentsData = [], refetch } = useQuery({
    queryKey: ["assignmentsData"],
    queryFn: () => dataFatching(),
  });

  return { assignmentsData, refetch };
}
