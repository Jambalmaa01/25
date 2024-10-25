import { AdminCityRemoveForeverScreen } from '@/components/screens';

export type AdminCityRemoveForeverPageProps = {
  params: {
    cityId: string;
  };
};

export default function AdminCityRemoveForeverPage(
  props: AdminCityRemoveForeverPageProps
) {
  const {
    params: { cityId },
  } = props;

  return <AdminCityRemoveForeverScreen cityId={cityId} />;
}
