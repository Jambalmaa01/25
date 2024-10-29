import { adminDepartmentRemoveDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDepartmentRemoveForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminDepartmentRemoveDialogProps = {
  onSuccess(): void;
};

export function AdminDepartmentRemoveDialog(
  props: AdminDepartmentRemoveDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminDepartmentRemoveDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      departmentIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminDepartmentRemoveForm
          departmentIds={dialog.departmentIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
