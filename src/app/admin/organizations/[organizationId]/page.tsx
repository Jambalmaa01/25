import { AdminOrganizationScreen } from '@/components/screens';

export type AdminOrganizationPageProps = {
  params: {
    organizationId: string;
  };
};

export default function AdminOrganizationPage(
  props: AdminOrganizationPageProps
) {
  const {
    params: { organizationId },
  } = props;

  return <AdminOrganizationScreen organizationId={organizationId} />;
}
