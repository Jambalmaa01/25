import { AdminCountryEditScreen } from '@/components/screens';

export type AdminCountryEditPageProps = {
  params: {
    countryId: string;
  };
};

export default function AdminCountryEditPage(props: AdminCountryEditPageProps) {
  const {
    params: { countryId },
  } = props;

  return <AdminCountryEditScreen countryId={countryId} />;
}
