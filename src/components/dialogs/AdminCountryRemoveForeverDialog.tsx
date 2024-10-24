import { adminCountryRemoveForeverDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCountryRemoveForeverForm } from '../forms';
import { BackButton } from '../buttons';

export type AdminCountryRemoveForeverDialogProps = {
  onSuccess(): void;
};

export function AdminCountryRemoveForeverDialog(
  props: AdminCountryRemoveForeverDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminCountryRemoveForeverDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      countryIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminCountryRemoveForeverForm
          countryIds={dialog.countryIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
