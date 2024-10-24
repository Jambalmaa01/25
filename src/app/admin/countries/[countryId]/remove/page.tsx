import { AdminCountryRemoveScreen } from '@/components/screens';

export type AdminCountryRemovePageProps = {
  params: {
    countryId: string;
  };
};

export default function AdminCountryRemovePage(
  props: AdminCountryRemovePageProps
) {
  const {
    params: { countryId },
  } = props;

  return <AdminCountryRemoveScreen countryId={countryId} />;
}
