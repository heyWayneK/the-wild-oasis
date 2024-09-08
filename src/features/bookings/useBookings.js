import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { getFilterOptions, getSortByOptions } from "./BookingTableOperations";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  // Query Client for PRE-FETCHING
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status") || getFilterOptions().at(0).value;
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortBy = searchParams.get("sortBy") || getSortByOptions().at(0).value;
  const [sortField, sortDirection] = sortBy.split("-");
  const sort =
    !sortField && !sortDirection
      ? null
      : { field: sortField, direction: sortDirection };

  const page = !searchParams.get("page")
    ? Number(1)
    : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    isError,
    data: { data: bookings, count } = {},
  } = useQuery({
    // [] is like dependencies for query to reload based on changed
    queryKey: [`bookings`, filter, sort, page],
    queryFn: () => getAllBookings(filter, sort, page),
  });

  // PREFETCH
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    // PREFETCH NEXT PAGE
    queryClient.prefetchQuery({
      queryKey: [`bookings`, filter, sort, page + 1],
      queryFn: () => getAllBookings(filter, sort, page + 1),
    });
  }
  if (page > 1) {
    // PREFETCH PREVIOUS PAGE
    queryClient.prefetchQuery({
      queryKey: [`bookings`, filter, sort, page - 1],
      queryFn: () => getAllBookings(filter, sort, page - 1),
    });
  }

  return { isLoading, isError, bookings, count };
}
