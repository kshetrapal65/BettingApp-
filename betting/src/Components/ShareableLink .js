const ShareableLink = (leagueId, inviteCode) => {
  return `${window.location.origin}/league-details/${leagueId}/invite/${inviteCode}`;
};

export default ShareableLink;
