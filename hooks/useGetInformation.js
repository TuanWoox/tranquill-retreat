import { useQuery } from "@tanstack/react-query";
import { getInformation } from "../services/userService";
export const useGetInformation = () => {
  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getInformation,
  });
  return {
    userInfo,
    isLoading,
    error,
  };
};
