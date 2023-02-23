import { useState } from 'react';
import { FormField, FileInput } from 'grommet';
import LabelWithInfoTip from '../../../../common/LabelWithInfoTip';

interface IAvatarForm {
  tipContent: string;
}

const AvatarForm = ({ tipContent }: IAvatarForm) => {
  const [hasFile, setHasFile] = useState<number>(0);
  const maxImageSize = 2_621_440; // 2.5MB

  return (
    <FormField
      htmlFor='avatar'
      name='avatar'
      label={
        <LabelWithInfoTip
          text='Upload avatar'
          tipContent={tipContent}
          alignTipContent={{ align: { left: 'right' } }}
        />
      }>
      <FileInput
        accept='image/png, image/gif, image/jpeg, image/jpg'
        messages={{
          dropPrompt: 'Drag and drop image',
          browse: hasFile ? 'Replace image' : 'Select image',
        }}
        maxSize={maxImageSize}
        onChange={(event, { files }: any) => setHasFile(files.length)}
        name='avatar'
      />
    </FormField>
  );
};

export default AvatarForm;
