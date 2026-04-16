function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function updateStreak(user) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (!user.lastSolvedDate) {
    user.currentStreak = 1;
    user.longestStreak = Math.max(user.longestStreak || 0, 1);
    user.lastSolvedDate = today;
    return;
  }

  const lastSolved = new Date(user.lastSolvedDate);
  const lastMidnight = new Date(lastSolved.getFullYear(), lastSolved.getMonth(), lastSolved.getDate());
  
  const diffMs = today.getTime() - lastMidnight.getTime();
  const diffDays = Math.round(diffMs / (24 * 60 * 60 * 1000));

  if (diffDays <= 0) {
    // Already solved today or time travel (shouldn't happen)
    return;
  }

  if (diffDays === 1) {
    user.currentStreak = (user.currentStreak || 0) + 1;
  } else {
    user.currentStreak = 1;
  }

  user.longestStreak = Math.max(user.longestStreak || 0, user.currentStreak);
  user.lastSolvedDate = today;
}

module.exports = { updateStreak };
