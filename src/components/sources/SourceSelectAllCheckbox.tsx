import { Checkbox } from '@mui/material';

export type SourceSelectAllCheckboxProps = {
  length: number | undefined;
  allIds: string[] | undefined;
  selectedIds: string[];
  setSelectedIds(ids: string[]): void;
  selectMultiple?: boolean;
};

export function SourceSelectAllCheckbox(props: SourceSelectAllCheckboxProps) {
  const {
    length = 0,
    allIds = [],
    selectedIds,
    setSelectedIds,
    selectMultiple = true,
  } = props;

  function onSelectAllIds() {
    if (!selectMultiple) {
      if (selectedIds.length) {
        setSelectedIds([]);
      }

      return;
    }

    if (selectedIds.length === length) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(allIds);
  }

  if (!selectMultiple) {
    return <></>;
  }

  return (
    <Checkbox
      indeterminate={
        selectedIds.length ? undefined : selectedIds.length === length
      }
      checked={selectedIds.length === length}
      onChange={onSelectAllIds}
    />
  );
}
