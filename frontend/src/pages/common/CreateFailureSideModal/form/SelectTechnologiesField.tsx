import React, { useState } from 'react';
import { FormField, SelectMultiple } from 'grommet';

const defaultOptions = [
  "React",
  "Java",
  "Cobol",
  "JavaScript"
];

const SelectTechnologiesField = () => {
  const [options, setOptions] = useState<Array<string>>(defaultOptions);
  const [selected, setSelected] = useState<Array<string>>([]);

  const handleTechnologySearch = (searchInput: string) => {
    const escapedSearchInput = searchInput.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const expression = new RegExp(escapedSearchInput, 'i');
    setOptions(defaultOptions.filter(option => expression.test(option)));
  }

  return (
    <FormField
      label="Technologies"
      htmlFor="technologies__input"
      name="technologies">
      <SelectMultiple
        name="technologies"
        placeholder="Which technologies you used?"
        searchPlaceholder="Search technologies"
        options={options}
        value={selected}
        onChange={({ value: nextValue }) => setSelected(nextValue)}
        onSearch={text => handleTechnologySearch(text)}
        onClose={() => {
          setOptions(defaultOptions)
        }}
      />
    </FormField>
  );
};


export default SelectTechnologiesField;