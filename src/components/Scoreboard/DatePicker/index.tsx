import React from 'react';
import { DatePicker } from 'antd';
import styles from './DatePicker.module.scss';
import { DatePickerProps } from '../../../types/props';

const DatePickerCustom = ({ onDateChange }: DatePickerProps): JSX.Element => {
  const onChange = (date: any | null, dateString: string) => {
    if (date) onDateChange(dateString);
  };
  return (
    <div className={styles.datePicker}>
      <span className={styles.date}>Game Date</span>
      <DatePicker onChange={onChange} />
    </div>
  );
};

export default React.memo(DatePickerCustom);
