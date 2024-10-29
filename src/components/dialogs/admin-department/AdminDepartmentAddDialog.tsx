import { adminDepartmentAddDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDepartmentAddForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminDepartmentAddDialogProps = {
  onSuccess(): void;
};

export function AdminDepartmentAddDialog(props: AdminDepartmentAddDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminDepartmentAddDialogAtom);

  function onClose() {
    setDialog({
      open: false,
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminDepartmentAddForm
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
