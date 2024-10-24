import { AdminCountryScreen } from '@/components/screens';

export type AdminCountryPageProps = {
  params: {
    countryId: string;
  };
};

export default function AdminCountryPage(props: AdminCountryPageProps) {
  const {
    params: { countryId },
  } = props;

  return <AdminCountryScreen countryId={countryId} />;
}
