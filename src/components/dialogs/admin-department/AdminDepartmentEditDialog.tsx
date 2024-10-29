import { adminDepartmentEditDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDepartmentEditForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminDepartmentEditDialogProps = {
  onSuccess(): void;
};

export function AdminDepartmentEditDialog(
  props: AdminDepartmentEditDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminDepartmentEditDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      departmentId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminDepartmentEditForm
          departmentId={dialog.departmentId}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
