import { adminCityRemoveDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCityRemoveForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminCityRemoveDialogProps = {
  onSuccess(): void;
};

export function AdminCityRemoveDialog(props: AdminCityRemoveDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminCityRemoveDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      cityIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminCityRemoveForm
          cityIds={dialog.cityIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
