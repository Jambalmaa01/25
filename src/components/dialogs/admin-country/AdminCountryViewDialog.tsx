import { adminCountryViewDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCountryViewForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export function AdminCountryViewDialog() {
  const [dialog, setDialog] = useAtom(adminCountryViewDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      countryId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose} maxWidth='sm'>
      <DialogContent>
        <AdminCountryViewForm
          countryId={dialog.countryId}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
