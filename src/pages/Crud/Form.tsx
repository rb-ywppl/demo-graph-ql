import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import { CREATE_RECORDS, UPDATE_RECORDS } from "../../client/querys/crud/Index";
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
  const [createUser] = useMutation(CREATE_RECORDS);
  const [updateUser] = useMutation(UPDATE_RECORDS);

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
