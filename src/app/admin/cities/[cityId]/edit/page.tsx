import { AdminCityEditScreen } from '@/components/screens';

export type AdminCityEditPageProps = {
  params: {
    cityId: string;
  };
};

export default function AdminCityEditPage(props: AdminCityEditPageProps) {
  const {
    params: { cityId },
  } = props;

  return <AdminCityEditScreen cityId={cityId} />;
}
