import React, { useRef } from 'react';
import cx from 'classnames';
import { useDebounce } from 'use-debounce';

import useLazyImage from '../../hooks/useLazyImage';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import s from './ProjectCard.module.scss';
import rootStyles from '../../styles/common.module.scss';

import { Project, LinkType } from '../../types/project';
import { FixedImage } from '../../types/image';

const getLink = ({ link, gh, ghUser }: LinkType) => `${gh ? `https://github.com/${ghUser || 'phenax'}/` : ''}${link}`;
const getIcon = ({ gh }: LinkType) => (gh ? 'fab fa-github' : 'fas fa-link');

const IMAGE_FADEIN_DURATION = 500;

const ProjectCard = ({ id, image, title, links, description, tags }: Project<FixedImage>) => {
  const cardRef = useRef(null);
  const isInView = useIntersectionObserver(cardRef, { offset: 300 });

  const { src } = useLazyImage(image, { isInView });
  const debouncedSrc = useDebounce(src, IMAGE_FADEIN_DURATION);

  return (
    <div className={s.project} data-id={id} key={id} ref={cardRef}>
      <div className={cx('wrap', rootStyles.row)}>
        <div className={cx(rootStyles.col, s.block, s.block_bg)} style={{ backgroundImage: src && `url(${src})` }}>
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
            {(tags || []).map(t => (
              <span key={t} className={s.blockTagsTag}>
                {t}
              </span>
            ))}
          </div>
          <div className={s.blockContent}>{description}</div>
          <div className={s.blockLinks}>
            {links.map(link => (
              <a key={link.link} target="_blank _parent" rel="noopener" href={getLink(link)}>
                <span className={s.blockLinkIcon}>
                  <i className={getIcon(link)} />
                </span>
                {link.gh ? 'Github' : link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
