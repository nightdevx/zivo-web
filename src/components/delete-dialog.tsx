import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface DeleteDialogProps {
  deleteText: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  deleteText,
  isOpen,
  setIsOpen,
  onConfirm,
  onCancel,
}) => {
  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>
          Are you sure you want to delete this {deleteText}?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This {deleteText} record will be
          permanently deleted.
        </AlertDialogDescription>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
