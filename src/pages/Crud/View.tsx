import type { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import type { DATAI } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  data: DATAI | null;
}

const ViewDialog: FC<Props> = ({ open, onClose, data }) => {
  if (!data) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            View Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 text-sm text-slate-700">
          <div>
            <Label className="text-muted-foreground">Name</Label>
            <div>{data.name}</div>
          </div>

          <div>
            <Label className="text-muted-foreground">Description</Label>
            <div>{data.description}</div>
          </div>

          <div>
            <Label className="text-muted-foreground">Status</Label>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                data.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {data.status ? "Active" : "Inactive"}
            </span>
          </div>

          <div>
            <Label className="text-muted-foreground">Archived</Label>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                data.isArchived
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {data.isArchived ? "Yes" : "No"}
            </span>
          </div>

          <div>
            <Label className="text-muted-foreground">Company</Label>
            <div>{data.companyId?.companyName}</div>
          </div>

          <div>
            <Label className="text-muted-foreground">Branch</Label>
            <div>{data.branchId?.branchName}</div>
          </div>

          <div>
            <Label className="text-muted-foreground">Created At</Label>
            <div>{formatDate(data.createdAt)}</div>
          </div>

          <div>
            <Label className="text-muted-foreground">Updated At</Label>
            <div>{formatDate(data.updatedAt)}</div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
