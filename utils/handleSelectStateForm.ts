import { Dispatch, FormEvent, SetStateAction } from "react";

export const handleSelectStateForm = (
  event: FormEvent<HTMLFormElement>,
  selectedStateInput: string,
  setSelectedState: Dispatch<SetStateAction<string>>
) => {
  event.preventDefault();

  const selectedStateInputClean = selectedStateInput
    .toLowerCase()
    .split(" ")
    .join("_");

  setSelectedState(selectedStateInputClean);
};
