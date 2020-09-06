import React from 'react';
import cx from 'classnames';

import s from './SkillList.module.scss';

import { Skill } from '../../types/project';

interface Props {
  skills: Skill[];
}

const SkillList = ({ skills }: Props) => (
  <div className={s.wrapper}>
    <div className={s.selector}>.skills {'{'}</div>

    <div className={s.propList}>
      {skills.map(({ name, level }) => (
        <div key={name}>
          <span className={s.propertyName}>{name}</span>
          <span className={cx(s.propertyValue, s[level])} />
        </div>
      ))}
    </div>

    <div className={s.selector}>{'}'}</div>
  </div>
);

export default SkillList;
