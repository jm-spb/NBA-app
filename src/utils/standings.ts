import { getYear, isAfter, isBefore } from 'date-fns';
import { IFilterTeamsByGroup, IFormatSeasons } from '../types/standingsTypes';

export const getSeasons = (length: number): number[] => {
  const currentDate = new Date();
  const currentYear = getYear(currentDate);
  let currentSeason = currentYear;
  const isAfterJanuaryFirst = isAfter(currentDate, new Date(currentYear, 0, 1));
  const isBeforeJulyFirst = isBefore(currentDate, new Date(currentYear, 6, 1));

  // NBA season starts in early October, end in the last days of June. If current date is after January 1st and before July 1st then current season starts in previos year
  if (isAfterJanuaryFirst && isBeforeJulyFirst) {
    currentSeason--;
  }

  const avaliableSeasons = new Array(length)
    .fill(null)
    .map((_, idx) => currentSeason - idx);
  return avaliableSeasons;
};

export const formatSeasons: IFormatSeasons = (avaliableSeasons) =>
  avaliableSeasons.map((year) => {
    const nextYear = (year + 1).toString().slice(2);
    return `${year}-${nextYear}`;
  });

export const filterTeamsByGroup: IFilterTeamsByGroup = (
  teamsStandings,
  groupData,
  groupName,
) => {
  const filterSort = (confName: string) =>
    teamsStandings
      .filter((team) => confName === team[groupName].name)
      .sort((a, b) =>
        a[groupName].rank === 0 || b[groupName].rank === 0
          ? Number(b.winPercentage) - Number(a.winPercentage)
          : a[groupName].rank - b[groupName].rank,
      );

  // if function is invoked in StandingsPage
  if (typeof groupData === 'object') return groupData.map(filterSort);

  // if function is invoked in StandingsWidget
  return filterSort(groupData);
};
