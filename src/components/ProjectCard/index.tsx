import React from 'react';
import cx from 'classnames';

import s from './ProjectCard.module.scss';
import rootStyles from '../../styles/common.module.scss';

import { Project } from '../../types/project';

const getIcon = ({}) => 'icon-someicon';

const ProjectCard = ({ id, image, title, links, description, tags }: Project) => (
  <div className={s.project} key={id}>
    <div className={cx('wrap', rootStyles.row)}>
      <div
        className={cx(rootStyles.col, s.block, s.block_bg)}
        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
      />

      <div className={cx(rootStyles.col, s.block, s.block_sm)}>
        <div className={s.blockTitle}>{title}</div>
        <div className={s.blockTags}>
          {(tags || []).map(t => <span key={t} className={s.blockTagsTag}>{t}</span>)}
        </div>
        <div className={s.blockContent}>{description}</div>
        <div className={s.blockLinks}>
          {links.map(link =>
            <a key={link.link} target='_blank _parent' rel="noopener" href={link.link}>
              <i className={cx(s.blockLinkIcon, getIcon(link))} />
              {link.gh ? 'Github' : link.text}
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
