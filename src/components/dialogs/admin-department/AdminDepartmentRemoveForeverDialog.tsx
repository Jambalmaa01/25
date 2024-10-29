import { adminDepartmentRemoveForeverDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDepartmentRemoveForeverForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminDepartmentRemoveForeverDialogProps = {
  onSuccess(): void;
};

export function AdminDepartmentRemoveForeverDialog(
  props: AdminDepartmentRemoveForeverDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminDepartmentRemoveForeverDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      departmentIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminDepartmentRemoveForeverForm
          departmentIds={dialog.departmentIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
