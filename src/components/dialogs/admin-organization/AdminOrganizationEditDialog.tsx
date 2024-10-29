import { adminOrganizationEditDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminOrganizationEditForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export type AdminOrganizationEditDialogProps = {
  onSuccess(): void;
};

export function AdminOrganizationEditDialog(
  props: AdminOrganizationEditDialogProps
) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(adminOrganizationEditDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      organizationId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose}>
      <DialogContent>
        <AdminOrganizationEditForm
          organizationId={dialog.organizationId}
          onSuccess={onSuccess}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
