"use client";

import axiosSecureApi from "@/Hooks/ApiRelatedHooks/AxiosSecureApi";
import { useQuery } from "@tanstack/react-query";

export default function useCoursesDataLoading(email,page,search,filters) {
  const dataFatching = async () => {
    // const filters = FiltersItemsCatch();
    // const queryString = `filters=${encodeURIComponent(
    //   JSON.stringify(filters)
    // )}`;

    const limit = 10;
    try {
      const res = await axiosSecureApi.get(
        `/course-create?email=${email}&page=${page}&limit=${limit}&search=${search}&filters=${filters}`
      );

      return res.data;
    } catch (error) {
      return error.message;
    }
  };

  const { data: coursesData = [], refetch, isLoading } = useQuery({
    queryKey: ["coursesData"],
    queryFn: () => dataFatching(),
    enabled:!!email,
  });

  return { coursesData, refetch, isLoading };
}
