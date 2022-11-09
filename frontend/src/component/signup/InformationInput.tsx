import * as React from "react";
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Gender } from "../../types";


interface IProps {
  label: string;
  value: string | number | Date | Gender;
  setValue: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>> | Dispatch<SetStateAction<Date>> | Dispatch<SetStateAction<Gender>>;
  type: HTMLInputTypeAttribute | "select";
  isPassword?: boolean;
  options?: { name: string; value: string | Gender | number }[];
}

export default function InformationInput({
  label,
  value,
  setValue,
  type,
  isPassword,
  options,
}: IProps) {
  return (
    <article className={"flex-none flex flex-col items-center justify-start"}>
      {
        type === "select" ?
          <FormControl
            sx={{
              maxWidth: 320,
              minWidth: 240,
            }}
            size={"small"}
            required
          >
            <InputLabel id={`input-label-${label}`}>
              {label}
            </InputLabel>
            <Select
              label={label}
              variant={"outlined"}
              value={value}
              onChange={(e) => {
                (setValue as Dispatch<SetStateAction<string | number>>)(e.target.value as (string | number));
              }}
            >
              {
                options?.map(({ name, value }) => (<MenuItem value={value} key={value}>{name}</MenuItem>))
              }
            </Select>
          </FormControl> :
          type === "date" ?
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label={label}
                value={value}
                inputFormat={"YYYY/MM/DD"}
                onChange={(newValue) => {
                  (setValue as Dispatch<SetStateAction<Date>>)(newValue ? new Date(newValue) : new Date());
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      maxWidth: 320,
                      minWidth: 240,
                    }}
                    size={"small"}
                    required
                  />)}
              />
            </LocalizationProvider> :
            <TextField
              sx={{
                maxWidth: 320,
                minWidth: 240,
              }}
              size={"small"}
              label={label}
              type={isPassword ? "password" : "text"}
              variant={"outlined"}
              value={value}
              onChange={(e) => {
                (setValue as Dispatch<SetStateAction<string>>)(e.target.value);
              }}
              required
            />
      }
    </article>
  );
}
