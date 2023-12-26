"use client";

import { State, create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormState } from "react-dom";

export const Form = () => {
  const initialState: State = { message: null, error: {} };
  const [state, dispatch] = useFormState(create, initialState);
  return (
    <form action={dispatch}>
      <div className=" flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="Enter title"
          className=" border-black border p-1 appearance-none"
        />
        {state?.error?.title
          ? state?.error?.title?.map((err) => <p key={err}>{err}</p>)
          : null}
      </div>
      <Button size={"sm"} type="submit" className="ml-2">
        Submit
      </Button>
    </form>
  );
};
