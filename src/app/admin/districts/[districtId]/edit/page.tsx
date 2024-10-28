import { AdminDistrictEditScreen } from '@/components/screens';

export type AdminDistrictEditPageProps = {
  params: {
    districtId: string;
  };
};

export default function AdminDistrictEditPage(
  props: AdminDistrictEditPageProps
) {
  const {
    params: { districtId },
  } = props;

  return <AdminDistrictEditScreen districtId={districtId} />;
}
