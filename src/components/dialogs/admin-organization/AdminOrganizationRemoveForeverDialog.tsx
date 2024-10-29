import { adminOrganizationRemoveForeverDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminOrganizationRemoveForeverForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminOrganizationRemoveForeverDialogProps = {
  onSuccess(): void;
};

export function AdminOrganizationRemoveForeverDialog(
  props: AdminOrganizationRemoveForeverDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminOrganizationRemoveForeverDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      organizationIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminOrganizationRemoveForeverForm
          organizationIds={dialog.organizationIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
