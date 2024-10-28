import { adminDistrictAddDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDistrictAddForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminDistrictAddDialogProps = {
  onSuccess(): void;
};

export function AdminDistrictAddDialog(props: AdminDistrictAddDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminDistrictAddDialogAtom);

  function onClose() {
    setDialog({
      open: false,
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminDistrictAddForm
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
