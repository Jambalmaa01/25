import { adminDepartmentViewDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDepartmentViewForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export function AdminDepartmentViewDialog() {
  const [dialog, setDialog] = useAtom(adminDepartmentViewDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      departmentId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose} maxWidth='sm'>
      <DialogContent>
        <AdminDepartmentViewForm
          departmentId={dialog.departmentId}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
