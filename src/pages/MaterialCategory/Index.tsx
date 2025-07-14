import { useMutation, useQuery } from "@apollo/client";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DELETE_MATERIAL_CATEGORY,
  FIND_MATERIAL_CATEGORY,
} from "../../client/querys/materialCategory/Index";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import useToggle from "../../hooks/useToggle";
import Form from "./Form";
import View from "./View";
import type { DATAI } from "./types";
import { toast } from "sonner";

const Index = () => {
  const [data, setData] = useState<DATAI[]>([]);
  const [editData, setEditData] = useState<DATAI | null>(null);
  const [viewData, setViewData] = useState<DATAI | null>(null);
  const { onClose, onOpen, toggle } = useToggle();
  const {
    onClose: onCloseView,
    onOpen: onOpenView,
    toggle: toggleView,
  } = useToggle();

  const {
    data: findUserData,
    loading,
    refetch,
  } = useQuery(FIND_MATERIAL_CATEGORY, {
    variables: { type: "materialCategory" },
  });

  const [deleteCategory] = useMutation(DELETE_MATERIAL_CATEGORY);

  useEffect(() => {
    if (!loading) {
      const items = findUserData?.allReferenceData?.data || [];
      setData(items);
    }
  }, [findUserData, loading]);

  const handleEdit = (item: DATAI) => {
    setEditData(item);
    onOpen();
  };

  const handleView = (item: DATAI) => {
    setViewData(item);
    onOpenView();
  };

  const handleDelete = async (item: DATAI) => {
    const res = await deleteCategory({ variables: { id: item._id } });
    const result = res?.data?.removeReferenceData;
    if (result?.success) {
      toast.success(result.message);
      refetch();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Material Categories
        </h1>
        <div className="flex gap-3">
          <Button
            onClick={() => refetch()}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Reload
          </Button>
          <Button
            onClick={onOpen}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Add New
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="text-slate-700 font-semibold">
                Name
              </TableHead>
              <TableHead className="text-slate-700 font-semibold">
                Description
              </TableHead>
              <TableHead className="text-slate-700 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-slate-700 font-semibold">
                Company
              </TableHead>
              <TableHead className="text-center text-slate-700 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <span className="text-gray-500">Loading...</span>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-slate-50 transition-all duration-200"
                >
                  <TableCell className="font-medium text-slate-800">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {item.description}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {item.companyId?.companyName}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-green-100"
                        onClick={() => handleView(item)}
                      >
                        <Eye className="text-green-600 w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-indigo-100"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="text-indigo-600 w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-100"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="text-red-600 w-5 h-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <span className="text-gray-500">No data found.</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Form
        open={toggle}
        onClose={onClose}
        editData={editData}
        setEditData={setEditData}
        refetch={refetch}
      />

      <View open={toggleView} onClose={onCloseView} data={viewData} />
    </div>
  );
};

export default Index;
