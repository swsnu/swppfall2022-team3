import React, { useCallback } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { pink, blue } from "@mui/material/colors";
import InformationInput from "./signup/InformationInput";
import TagElement from "./signup/TagElement";


interface IProps<T extends {key: number; name: string}> {
  title: string;
  value: number | "";
  values: T[];
  includedValues: T[];
  excludedValues: T[];
  setValue: React.Dispatch<React.SetStateAction<number | "">>;
  setIncludedValues: React.Dispatch<React.SetStateAction<T[]>>;
  setExcludedValues: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function UserFilterElement<T extends {key: number; name: string}>({
  title,
  value,
  values,
  includedValues,
  excludedValues,
  setValue,
  setIncludedValues,
  setExcludedValues,
}: IProps<T>) {
  const addIncludedValues = useCallback(() => {
    if (value) {
      const addedValue = values.filter((v) => v.key === value)[0];
      if (!includedValues.includes(addedValue) && !excludedValues.includes(addedValue)) {
        setIncludedValues([...includedValues, addedValue]);
      }
    }
  }, [value, values, includedValues, excludedValues, setIncludedValues]);

  const addExcludedValues = useCallback(() => {
    if (value) {
      const addedValue = values.filter((v) => v.key === value)[0];
      if (!includedValues.includes(addedValue) && !excludedValues.includes(addedValue)) {
        setExcludedValues([...excludedValues, addedValue]);
      }
    }
  }, [value, values, includedValues, excludedValues, setExcludedValues]);

  const deleteIncludedValues = useCallback((key: number) => {
    setIncludedValues(includedValues.filter((v) => v.key !== key));
  }, [includedValues, setIncludedValues]);

  const deleteExcludedValues = useCallback((key: number) => {
    setExcludedValues(excludedValues.filter((v) => v.key !== key));
  }, [excludedValues, setExcludedValues]);

  return (
    <section>
      <p>{title}</p>
      <article className={"flex flex-row mb-4"}>
        <InformationInput
          label={""}
          value={value}
          setValue={setValue}
          type={"select"}
          required={false}
          options={values.map((value) => ({ name: value.name, value: value.key }))}
        />
        <button
          className={"ml-2"}
          onClick={addIncludedValues}
        >
          <AddCircleIcon
            style={{ color: pink[400] }}
            fontSize={"large"}
          />
        </button>
        <button
          className={"ml-2"}
          onClick={addExcludedValues}
        >
          <RemoveCircleIcon
            style={{ color: blue[400] }}
            fontSize={"large"}
          />
        </button>
      </article>
      <article
        className={"w-full max-w-xs mb-4 flex flex-row flex-wrap text-base font-bold justify-start"}
      >
        {
          includedValues.map((college) => (
            <TagElement
              key={college.key}
              name={college.name}
              included={true}
              onDelete={() => { deleteIncludedValues(college.key); }}
            />
          ))
        }
        {
          excludedValues.map((value) => (
            <TagElement
              key={value.key}
              name={value.name}
              included={false}
              onDelete={() => { deleteExcludedValues(value.key); }}
            />
          ))
        }
      </article>
    </section>
  );
}
