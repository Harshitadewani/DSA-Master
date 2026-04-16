function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function updateStreak(user) {
  const today = startOfDay(new Date());

  if (!user.lastSolvedDate) {
    user.currentStreak = 1;
    user.longestStreak = Math.max(user.longestStreak, user.currentStreak);
    user.lastSolvedDate = today;
    return;
  }

  const lastSolved = startOfDay(user.lastSolvedDate);
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((today - lastSolved) / oneDayMs);

  if (diffDays === 0) return;
  if (diffDays === 1) user.currentStreak += 1;
  else user.currentStreak = 1;

  user.longestStreak = Math.max(user.longestStreak, user.currentStreak);
  user.lastSolvedDate = today;
}

module.exports = { updateStreak };
