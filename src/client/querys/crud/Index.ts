import { gql } from "@apollo/client";

export const FIND_RECORDS = gql`
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

export const GET_RECORDS = gql`
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

export const CREATE_RECORDS = gql`
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

export const UPDATE_RECORDS = gql`
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

export const DELETE_RECORDS = gql`
  mutation RemoveReferenceData($id: ID!) {
    removeReferenceData(id: $id) {
      success
      message
    }
  }
`;
