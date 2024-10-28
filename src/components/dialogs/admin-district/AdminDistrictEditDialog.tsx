import { adminDistrictEditDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDistrictEditForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminDistrictEditDialogProps = {
  onSuccess(): void;
};

export function AdminDistrictEditDialog(props: AdminDistrictEditDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminDistrictEditDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      districtId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminDistrictEditForm
          districtId={dialog.districtId}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
