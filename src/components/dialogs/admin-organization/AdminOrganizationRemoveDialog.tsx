import { adminOrganizationRemoveDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminOrganizationRemoveForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminOrganizationRemoveDialogProps = {
  onSuccess(): void;
};

export function AdminOrganizationRemoveDialog(
  props: AdminOrganizationRemoveDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminOrganizationRemoveDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      organizationIds: [],
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminOrganizationRemoveForm
          organizationIds={dialog.organizationIds}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
