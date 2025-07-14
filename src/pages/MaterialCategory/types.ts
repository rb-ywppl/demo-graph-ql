export interface DATAI {
  __typename: "ReferenceData";
  _id: string;
  type: string;
  name: string;
  description: string;
  status: boolean;
  isArchived: boolean;
  companyId: {
    __typename: "CompanySetting";
    _id: string;
    companyName: string;
  };
  branchId: {
    __typename: "Branch";
    _id: string;
    branchName: string;
  };
  createdAt: string;
  updatedAt: string;
}
