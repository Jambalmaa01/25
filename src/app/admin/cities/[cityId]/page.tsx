import { AdminCityScreen } from '@/components/screens';

export type AdminCityPageProps = {
  params: {
    cityId: string;
  };
};

export default function AdminCityPage(props: AdminCityPageProps) {
  const {
    params: { cityId },
  } = props;

  return <AdminCityScreen cityId={cityId} />;
}
