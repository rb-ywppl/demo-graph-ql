import { gql } from "@apollo/client";

export const FIND_MATERIAL_CATEGORY = gql`
  query AllReferenceData($type: String!) {
    allReferenceData(type: $type) {
      success
      message
      data {
        _id
        type
        name
        description
        status
        isArchived
        companyId {
          _id
          companyName
        }
        branchId {
          _id
          branchName
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_MATERIAL_CATEGORY = gql`
  query AllReferenceData($id: ID!) {
    allReferenceData(id: $id) {
      success
      message
      data {
        _id
        type
        name
        description
        status
        isArchived
        companyId {
          _id
          companyName
        }
        branchId {
          _id
          branchName
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_MATERIAL_CATEGORY = gql`
  mutation CreateReferenceData($createInput: CreateReferenceDataInput!) {
    createReferenceData(createInput: $createInput) {
      success
      message
      data {
        _id
        type
        name
        description
        status
        isArchived
      }
    }
  }
`;

export const UPDATE_MATERIAL_CATEGORY = gql`
  mutation UpdateReferenceData(
    $updateReferenceDataInput: UpdateReferenceDataInput!
  ) {
    updateReferenceData(updateReferenceDataInput: $updateReferenceDataInput) {
      success
      message
      data {
        _id
        type
        name
        description
        status
        isArchived
      }
    }
  }
`;

export const DELETE_MATERIAL_CATEGORY = gql`
  mutation RemoveReferenceData($id: ID!) {
    removeReferenceData(id: $id) {
      success
      message
    }
  }
`;
