import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  // react-router-dom
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSearchParam = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);

    // reset page to 1 if there is a page search param
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)}
          key={option.value}
          active={activeSearchParam === option.value ? "active" : ""}
          disabled={activeSearchParam === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

// function useFilter({}) {
//   const [searchParams] = useSearchParams();

//   const filterValue = searchParams.get("discount") || "all";
//   let filteredCabins;

//   switch (filterValue) {
//     case "no-discount":
//       filteredCabins = cabins.filter((cabin) => !cabin.discount);
//       break;
//     case "with-discount":
//       filteredCabins = cabins.filter((cabin) => cabin.discount);
//       break;
//     default:
//       // "all"
//       filteredCabins = cabins;
//   }

//   return;
// }

export default Filter;
