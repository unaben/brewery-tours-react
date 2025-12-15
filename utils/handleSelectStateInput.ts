import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleSelectStateInput = (
  event: ChangeEvent<HTMLInputElement>,
  setSelectedStateInput: Dispatch<SetStateAction<string>>
) => {
  setSelectedStateInput(event.target.value);
};
