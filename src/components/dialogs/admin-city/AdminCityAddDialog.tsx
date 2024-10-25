import { adminCityAddDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCityAddForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminCityAddDialogProps = {
  onSuccess(): void;
};

export function AdminCityAddDialog(props: AdminCityAddDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminCityAddDialogAtom);

  function onClose() {
    setDialog({
      open: false,
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminCityAddForm
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
