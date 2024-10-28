import { AdminDistrictRemoveForeverScreen } from '@/components/screens';

export type AdminDistrictRemoveForeverPageProps = {
  params: {
    districtId: string;
  };
};

export default function AdminDistrictRemoveForeverPage(
  props: AdminDistrictRemoveForeverPageProps
) {
  const {
    params: { districtId },
  } = props;

  return <AdminDistrictRemoveForeverScreen districtId={districtId} />;
}
