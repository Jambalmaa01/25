import { adminDistrictViewDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDistrictViewForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export function AdminDistrictViewDialog() {
  const [dialog, setDialog] = useAtom(adminDistrictViewDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      districtId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose} maxWidth='sm'>
      <DialogContent>
        <AdminDistrictViewForm
          districtId={dialog.districtId}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
