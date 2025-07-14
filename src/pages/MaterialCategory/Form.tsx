// import { useMutation } from "@apollo/client";
// import { useFormik } from "formik";
// import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
// import {
//   CREATE_MATERIAL_CATEGORY,
//   UPDATE_MATERIAL_CATEGORY,
// } from "../../client/querys/materialCategory/Index";
// import Switch from "../../components/Switch";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "../../components/ui/dialog";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import type { DATAI } from "./types";
// import { toast } from "sonner";

// interface IProps {
//   open: boolean;
//   onClose: () => void;
//   refetch: () => void;
//   editData: DATAI | null;
//   setEditData: Dispatch<SetStateAction<DATAI | null>>;
// }

// const Form: FC<IProps> = ({
//   onClose,
//   open,
//   refetch,
//   editData,
//   setEditData,
// }) => {
//   const [createUser] = useMutation(CREATE_MATERIAL_CATEGORY);
//   const [updateUser] = useMutation(UPDATE_MATERIAL_CATEGORY);

//   const {
//     handleBlur,
//     handleChange,
//     values,
//     setFieldValue,
//     handleSubmit,
//     resetForm,
//   } = useFormik({
//     initialValues: {
//       name: "",
//       description: "",
//       status: false,
//     },
//     onSubmit: async (submitedData) => {
//       console.log("🌽 submitedData", submitedData);

//       const response = editData
//         ? await updateUser({
//             variables: {
//               updateReferenceDataInput: {
//                 id: editData?._id,
//                 type: "materialCategory",
//                 name: submitedData?.name,
//                 description: submitedData?.description,
//                 status: submitedData?.status,
//               },
//             },
//           })
//         : await createUser({
//             variables: {
//               createInput: {
//                 type: "materialCategory",
//                 name: submitedData.name,
//                 description: submitedData.description,
//                 status: submitedData.status,
//               },
//             },
//           });

//       const resulte = editData
//         ? response?.data?.updateReferenceData
//         : response?.data?.createReferenceData;

//       console.log("🪲 resulte", response);

//       if (resulte?.success) {
//         toast.success(resulte?.message);
//         await refetch();
//         resetForm();
//         onClose();
//         setEditData(null);
//       } else {
//         toast.error(resulte?.message);
//       }
//     },
//   });

//   const handleClose = async () => {
//     await refetch();
//     resetForm();
//     onClose();
//     setEditData(null);
//   };

//   useEffect(() => {
//     if (editData) {
//       setFieldValue("name", editData.name);
//       setFieldValue("description", editData.description);
//       setFieldValue("status", editData.status);
//     }
//   }, [editData, setFieldValue]);

//   return (
//     <div>
//       <Dialog open={open} onOpenChange={handleClose}>
//         <DialogContent className="sm:max-w-4xl">
//           <form onSubmit={handleSubmit}>
//             <DialogHeader>
//               <DialogTitle>Add Item</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4">
//               <div className="grid gap-3">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.name}
//                   id="name"
//                   name="name"
//                 />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="description">Description</Label>
//                 <textarea
//                   className="w-full h-32 p-2 rounded-md border"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.description}
//                   name="description"
//                   id="description"
//                 />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="status">Status</Label>
//                 <Switch
//                   checked={values.status}
//                   onChange={(e) => setFieldValue("status", e.target.checked)}
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end items-center gap-3">
//               <button
//                 type="button"
//                 className="border px-4 py-2 rounded-lg text-black"
//                 onClick={handleClose}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-black px-4 py-2 rounded-lg text-white"
//                 onClick={() => console.log("Submit clicked")}
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Form;

import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import {
  CREATE_MATERIAL_CATEGORY,
  UPDATE_MATERIAL_CATEGORY,
} from "../../client/querys/materialCategory/Index";
import Switch from "../../components/Switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import type { DATAI } from "./types";
import { toast } from "sonner";

interface IProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  editData: DATAI | null;
  setEditData: Dispatch<SetStateAction<DATAI | null>>;
}

const Form: FC<IProps> = ({
  onClose,
  open,
  refetch,
  editData,
  setEditData,
}) => {
  const [createUser] = useMutation(CREATE_MATERIAL_CATEGORY);
  const [updateUser] = useMutation(UPDATE_MATERIAL_CATEGORY);

  const {
    handleBlur,
    handleChange,
    values,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: false,
    },
    onSubmit: async (submitedData) => {
      const response = editData
        ? await updateUser({
            variables: {
              updateReferenceDataInput: {
                id: editData._id,
                type: "materialCategory",
                name: submitedData.name,
                description: submitedData.description,
                status: submitedData.status,
              },
            },
          })
        : await createUser({
            variables: {
              createInput: {
                type: "materialCategory",
                name: submitedData.name,
                description: submitedData.description,
                status: submitedData.status,
              },
            },
          });

      const result = editData
        ? response?.data?.updateReferenceData
        : response?.data?.createReferenceData;

      if (result?.success) {
        toast.success(result.message);
        await refetch();
        resetForm();
        onClose();
        setEditData(null);
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    },
  });

  const handleClose = async () => {
    await refetch();
    resetForm();
    onClose();
    setEditData(null);
  };

  useEffect(() => {
    if (editData) {
      setFieldValue("name", editData.name);
      setFieldValue("description", editData.description);
      setFieldValue("status", editData.status);
    }
  }, [editData, setFieldValue]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-800">
              {editData ? "Update Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter category name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter description"
                className="w-full h-28 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-700 shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="status" className="mb-0">
                Status
              </Label>
              <Switch
                checked={values.status}
                onChange={(e) => setFieldValue("status", e.target.checked)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              {editData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
