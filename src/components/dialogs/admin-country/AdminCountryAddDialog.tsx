import { adminCountryAddDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCountryAddForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminCountryAddDialogProps = {
  onSuccess(): void;
};

export function AdminCountryAddDialog(props: AdminCountryAddDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminCountryAddDialogAtom);

  function onClose() {
    setDialog({
      open: false,
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminCountryAddForm
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
