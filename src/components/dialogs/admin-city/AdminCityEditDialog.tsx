import { adminCityEditDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCityEditForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminCityEditDialogProps = {
  onSuccess(): void;
};

export function AdminCityEditDialog(props: AdminCityEditDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminCityEditDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      cityId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminCityEditForm
          cityId={dialog.cityId}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
