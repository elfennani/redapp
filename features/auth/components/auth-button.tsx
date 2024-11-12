import Button from "@/components/Button";
import React from "react";
import useInitiateAuth from "../hooks/use-initiate-auth";

const AuthButton = () => {
  const { mutate, isPending } = useInitiateAuth();

  return (
    <Button onPress={() => mutate()} disabled={isPending}>
      <Button.Label>Sign in with Reddit</Button.Label>
    </Button>
  );
};

export default AuthButton;
