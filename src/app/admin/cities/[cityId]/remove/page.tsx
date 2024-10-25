import { AdminCityRemoveScreen } from '@/components/screens';

export type AdminCityRemovePageProps = {
  params: {
    cityId: string;
  };
};

export default function AdminCityRemovePage(props: AdminCityRemovePageProps) {
  const {
    params: { cityId },
  } = props;

  return <AdminCityRemoveScreen cityId={cityId} />;
}
