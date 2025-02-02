import React from 'react';

const rankIcons: Record<number, string> = {
  0: '/assets/icon/icon_ranking_first.svg',
  1: '/assets/icon/icon_ranking_second.svg',
  2: '/assets/icon/icon_ranking_third.svg',
  3: '/assets/icon/icon_ranking_fourth.svg',
  4: '/assets/icon/icon_ranking_fifth.svg',
};
const RankingIcon = (props: { index: number; width?: string }) => {
  const iconSrc = rankIcons[props?.index];
  return iconSrc ? (
    <img
      src={iconSrc}
      style={{ width: props?.width }}
      alt={`Ranking ${props.index + 1}`}
    />
  ) : null;
};

export default RankingIcon;
