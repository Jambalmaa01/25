import { adminCountryRemoveDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCountryRemoveForm } from '../forms';
import { BackButton } from '../buttons';

export type AdminCountryRemoveDialogProps = {
  onSuccess(): void;
};

export function AdminCountryRemoveDialog(props: AdminCountryRemoveDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminCountryRemoveDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      countryIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminCountryRemoveForm
          countryIds={dialog.countryIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
