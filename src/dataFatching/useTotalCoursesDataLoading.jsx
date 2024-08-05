"use client";

import axiosPublicApi from "@/Hooks/ApiRelatedHooks/AxiosPublicApi";
import { useQuery } from "@tanstack/react-query";

export default function useTotalCoursesDataLoading(page,search,sort,filters) {
  const dataFatching = async () => {

    const limit = 12;
    try {
      const res = await axiosPublicApi.get(
        `/all-courses-data?page=${page}&limit=${limit}&search=${search}&sort=${sort}&filters=${filters}`
      );

      return res.data;
    } catch (error) {
      return error.message;
    }
  };

  const { data: coursesData = [], refetch, isLoading } = useQuery({
    queryKey: ["coursesData"],
    queryFn: () => dataFatching(),
  });

  return { coursesData, refetch, isLoading };
}
