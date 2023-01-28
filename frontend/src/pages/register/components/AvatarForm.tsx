import React, { useState } from 'react';

import {
  FormField,
  FileInput,
} from 'grommet';

import LabelWithInfoTip from './LabelWithInfoTip';

const AvatarForm = () => {
  const [hasFile, setHasFile] = useState(0);
  const maxImageSize = 2_621_440; // 2.5MB

  return (
    <FormField
      htmlFor="fileinput"
      name="fileinput"
      label={<LabelWithInfoTip />}
    >
      <FileInput
        accept="image/*"
        messages={{
          dropPrompt: 'Drag and drop image',
          browse: hasFile ? 'Replace image' : 'Select image',
        }}
        maxSize={maxImageSize}
        onChange={(event, { files }: any) => setHasFile(files.length)}
        name="fileinput"
      />
    </FormField>
  )
}

export default AvatarForm;