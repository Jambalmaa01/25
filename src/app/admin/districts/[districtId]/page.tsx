import { AdminDistrictScreen } from '@/components/screens';

export type AdminDistrictPageProps = {
  params: {
    districtId: string;
  };
};

export default function AdminDistrictPage(props: AdminDistrictPageProps) {
  const {
    params: { districtId },
  } = props;

  return <AdminDistrictScreen districtId={districtId} />;
}
