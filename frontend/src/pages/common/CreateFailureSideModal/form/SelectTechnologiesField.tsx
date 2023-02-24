import { useState } from 'react';
import { FormField, SelectMultiple } from 'grommet';
import { defaultTechnologysOptions } from '../../../../utils/constants';

const SelectTechnologiesField = () => {
  const [options, setOptions] = useState<Array<string>>(defaultTechnologysOptions);
  const [selected, setSelected] = useState<Array<string>>([]);

  const handleTechnologySearch = (searchInput: string) => {
    const escapedSearchInput = searchInput.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const expression = new RegExp(escapedSearchInput, 'i');
    setOptions(defaultTechnologysOptions.filter((option) => expression.test(option)));
  };

  return (
    <FormField label='Technologies' name='technologies'>
      <SelectMultiple
        name='technologies'
        limit={6}
        showSelectedInline={true}
        placeholder='Technologies used? (max. 6)'
        emptySearchMessage='No technologies found.'
        searchPlaceholder='Search for technology'
        options={options}
        value={selected}
        onChange={({ value: nextValue }) => setSelected(nextValue)}
        onSearch={(text) => handleTechnologySearch(text)}
        onClose={() => {
          setOptions(defaultTechnologysOptions);
        }}
      />
    </FormField>
  );
};

export default SelectTechnologiesField;
