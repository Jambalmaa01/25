import { AdminOrganizationRemoveScreen } from '@/components/screens';

export type AdminOrganizationRemovePageProps = {
  params: {
    organizationId: string;
  };
};

export default function AdminOrganizationRemovePage(
  props: AdminOrganizationRemovePageProps
) {
  const {
    params: { organizationId },
  } = props;

  return <AdminOrganizationRemoveScreen organizationId={organizationId} />;
}
