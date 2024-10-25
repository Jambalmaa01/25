import { adminCityRemoveForeverDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCityRemoveForeverForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminCityRemoveForeverDialogProps = {
  onSuccess(): void;
};

export function AdminCityRemoveForeverDialog(
  props: AdminCityRemoveForeverDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminCityRemoveForeverDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      cityIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminCityRemoveForeverForm
          cityIds={dialog.cityIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
