import React from 'react';

import s from './PageHeader.module.scss';

type Props = {
  type?: string,
  title: string,
  subtitle?: string,
};

const defaultProps = {
  type: 'mini',
  subtitle: '',
};

const PageHeader = (passedProps: Props) => {
  const { type, title, subtitle } = { ...defaultProps, ...passedProps };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.title}>{title}</div>
        <div className={s.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default PageHeader;
