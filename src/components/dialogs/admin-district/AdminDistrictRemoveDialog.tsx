import { adminDistrictRemoveDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDistrictRemoveForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminDistrictRemoveDialogProps = {
  onSuccess(): void;
};

export function AdminDistrictRemoveDialog(
  props: AdminDistrictRemoveDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminDistrictRemoveDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      districtIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminDistrictRemoveForm
          districtIds={dialog.districtIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
