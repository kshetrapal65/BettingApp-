const ShareableLink = (leagueId, inviteCode, ids) => {
  return `${window.location.origin}/league-details/${leagueId}/invite/${inviteCode}/${ids}`;
};

export default ShareableLink;
