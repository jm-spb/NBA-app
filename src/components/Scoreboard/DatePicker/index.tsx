import React from 'react';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

import styles from './DatePicker.module.scss';
import { IDatePickerProps } from '../../../types/scoreboardTypes';

const GenerateDatePicker = generatePicker<Date>(dateFnsGenerateConfig);

const DatePicker = ({ onDateChange }: IDatePickerProps): JSX.Element => {
  const onChange = (date: Date | null, dateString: string) => {
    if (date) onDateChange(dateString);
  };
  return (
    <div className={styles.datePicker}>
      <span className={styles.date}>Game Date</span>
      <GenerateDatePicker onChange={onChange} />
    </div>
  );
};

export default React.memo(DatePicker);
