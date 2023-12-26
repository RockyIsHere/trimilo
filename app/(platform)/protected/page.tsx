"use client";

import { UserButton, auth, currentUser, useAuth, useUser } from "@clerk/nextjs";
import React from "react";

const Protected = async () => {
  return (
    <div>
      <UserButton
      afterSignOutUrl="/"
      
       />
    </div>
  );
};

export default Protected;
