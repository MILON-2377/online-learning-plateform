import axiosSecureApi from "@/Hooks/ApiRelatedHooks/AxiosSecureApi"


  const fetchSingleData = async(url) => {
    try {
        const res = await axiosSecureApi.get(url);
        return res.data;
    } catch (error) {
        return error.message;
    }
  }

export default fetchSingleData;
