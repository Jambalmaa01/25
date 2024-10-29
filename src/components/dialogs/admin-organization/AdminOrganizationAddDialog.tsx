import { adminOrganizationAddDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminOrganizationAddForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminOrganizationAddDialogProps = {
  onSuccess(): void;
};

export function AdminOrganizationAddDialog(
  props: AdminOrganizationAddDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminOrganizationAddDialogAtom);

  function onClose() {
    setDialog({
      open: false,
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminOrganizationAddForm
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
