import { adminCityViewDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCityViewForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export function AdminCityViewDialog() {
  const [dialog, setDialog] = useAtom(adminCityViewDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      cityId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose} maxWidth='sm'>
      <DialogContent>
        <AdminCityViewForm
          cityId={dialog.cityId}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
