import { adminOrganizationViewDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminOrganizationViewForm } from '@/components/forms';
import { BackButton } from '@/components/buttons';

export function AdminOrganizationViewDialog() {
  const [dialog, setDialog] = useAtom(adminOrganizationViewDialogAtom);

  function onClose() {
    setDialog({
      open: false,
      organizationId: '',
    });
  }

  return (
    <Dialog open={dialog.open} onClose={onClose} maxWidth='sm'>
      <DialogContent>
        <AdminOrganizationViewForm
          organizationId={dialog.organizationId}
          BackComponent={<BackButton onClick={onClose} />}
        />
      </DialogContent>
    </Dialog>
  );
}
