import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isPending,
    isError,
    data: cabins,
  } = useQuery({
    queryKey: [`cabins`],
    queryFn: getCabins,
  });
  return { isPending, isError, cabins };
}
