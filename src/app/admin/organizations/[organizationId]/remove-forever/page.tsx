import { AdminOrganizationRemoveForeverScreen } from '@/components/screens';

export type AdminOrganizationRemoveForeverPageProps = {
  params: {
    organizationId: string;
  };
};

export default function AdminOrganizationRemoveForeverPage(
  props: AdminOrganizationRemoveForeverPageProps
) {
  const {
    params: { organizationId },
  } = props;

  return (
    <AdminOrganizationRemoveForeverScreen organizationId={organizationId} />
  );
}
