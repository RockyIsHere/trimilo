"use client";

import React, { useEffect, useState } from "react";
import CardModel from "../model/card-model";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <CardModel />;
};

export default ModelProvider;
