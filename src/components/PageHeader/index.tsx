import React from 'react';

import s from './PageHeader.module.scss';

type Props = {
  title: string|JSX.Element
  subtitle?: string|JSX.Element
  preTitle?: string|JSX.Element
};

const defaultProps = {
  subtitle: '',
  preTitle: '',
};

const PageHeader = (passedProps: Props) => {
  const { title, subtitle, preTitle } = { ...defaultProps, ...passedProps };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {preTitle}
        <div className={s.title}>{title}</div>
        <div className={s.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default PageHeader;
