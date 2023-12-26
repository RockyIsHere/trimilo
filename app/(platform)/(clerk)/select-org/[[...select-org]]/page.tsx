import { OrganizationList } from "@clerk/nextjs";
import React from "react";

const CreateOrgnizationPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:id"}
      afterCreateOrganizationUrl={"/organization/:id"}
    />
  );
};

export default CreateOrgnizationPage;
