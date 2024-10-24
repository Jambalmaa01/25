import { AdminCountryRemoveForeverScreen } from '@/components/screens';

export type AdminCountryRemoveForeverPageProps = {
  params: {
    countryId: string;
  };
};

export default function AdminCountryRemoveForeverPage(
  props: AdminCountryRemoveForeverPageProps
) {
  const {
    params: { countryId },
  } = props;

  return <AdminCountryRemoveForeverScreen countryId={countryId} />;
}
