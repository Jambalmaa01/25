import { adminDistrictRemoveForeverDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDistrictRemoveForeverForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminDistrictRemoveForeverDialogProps = {
  onSuccess(): void;
};

export function AdminDistrictRemoveForeverDialog(
  props: AdminDistrictRemoveForeverDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminDistrictRemoveForeverDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      districtIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminDistrictRemoveForeverForm
          districtIds={dialog.districtIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
