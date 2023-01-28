import React, { useState } from 'react';

import {
  FormField,
  FileInput,
} from 'grommet';

import LabelWithInfoTip from './LabelWithInfoTip';

const AvatarForm = () => {
  const [numFiles, setNumFiles] = useState(0);

  return (
    <FormField
      htmlFor="fileinput"
      name="fileinput"
      label={<LabelWithInfoTip />}
    >
      <FileInput
        messages={{
          dropPrompt: 'Drag and drop',
          browse: numFiles > 0 ? 'Replace file' : 'Select file',
        }}
        onChange={(event, { files }: any) => setNumFiles(files.length)}
        name="fileinput"
      />
    </FormField>
  )
}

export default AvatarForm;