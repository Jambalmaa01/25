import { adminCountryEditDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCountryEditForm } from '../forms';
import { BackButton } from '../buttons';

export type AdminCountryEditDialogProps = {
  onSuccess(): void;
};

export function AdminCountryEditDialog(props: AdminCountryEditDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminCountryEditDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      countryId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminCountryEditForm
          countryId={dialog.countryId}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
