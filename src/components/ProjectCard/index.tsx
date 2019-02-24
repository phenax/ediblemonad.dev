import React from 'react';
import cx from 'classnames';
import { useDebounce } from 'use-debounce';

import useLazyImage from '../../hooks/useLazyImage';

import s from './ProjectCard.module.scss';
import rootStyles from '../../styles/common.module.scss';

import { Project } from '../../types/project';
import { FixedImage } from '../../types/image';

const getIcon = ({}) => 'icon-someicon';

const IMAGE_FADEIN_DURATION = 500;

const ProjectCard = ({ id, image, title, links, description, tags }: Project<FixedImage>) => {
  const { src } = useLazyImage(image);
  const debouncedSrc = useDebounce(src, IMAGE_FADEIN_DURATION);

  return (
    <div className={s.project} data-id={id} key={id}>
      <div className={cx('wrap', rootStyles.row)}>
        <div
          className={cx(rootStyles.col, s.block, s.block_bg)}
          style={{ backgroundImage: src && `url(${src})` }}
        >
          <div
            className={s.blockFakeBackground}
            style={{
              backgroundImage: debouncedSrc && `url(${debouncedSrc})`,
              opacity: debouncedSrc !== src ? 0 : 1,
              transitionDuration: `${IMAGE_FADEIN_DURATION}ms`,
            }}
          />
        </div>

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
}

export default ProjectCard;
