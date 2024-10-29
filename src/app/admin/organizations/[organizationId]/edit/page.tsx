import { AdminOrganizationEditScreen } from '@/components/screens';

export type AdminOrganizationEditPageProps = {
  params: {
    organizationId: string;
  };
};

export default function AdminOrganizationEditPage(
  props: AdminOrganizationEditPageProps
) {
  const {
    params: { organizationId },
  } = props;

  return <AdminOrganizationEditScreen organizationId={organizationId} />;
}
