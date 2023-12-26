import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} size={"sm"} type="submit" className="ml-2">
      Submit
    </Button>
  );
};

export default FormButton;
