import { AdminDistrictRemoveScreen } from '@/components/screens';

export type AdminDistrictRemovePageProps = {
  params: {
    districtId: string;
  };
};

export default function AdminDistrictRemovePage(
  props: AdminDistrictRemovePageProps
) {
  const {
    params: { districtId },
  } = props;

  return <AdminDistrictRemoveScreen districtId={districtId} />;
}
