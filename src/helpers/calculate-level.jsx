function calculateLevel(progress){
    let totalXp = progress;
    let level = 1;
    let nextLevel = 40 * Math.pow(level, 2) + 360 * level;
    let previousLevel;
    while (totalXp > nextLevel && level !== 60) {
      level++;
      previousLevel = nextLevel;
      if (level < 11) {
        nextLevel = 40 * Math.pow(level, 2) + 360 * level;
      } else if (level < 27) {
        nextLevel =
          -0.4 * Math.pow(level, 3) + 40.4 * Math.pow(level, 2) + 396 * level;
      } else if (level < 59) {
        nextLevel = (65 * Math.pow(level, 2) - 165 * level - 6750) * 0.82;
      } else {
        nextLevel = 155 + (level * 5 + 45) * (1344 - 69 - ((69-level)*(3+(69-level)*4)))
      }
    }
    let xpNeeded = nextLevel - previousLevel;
    let xpLeft = totalXp - previousLevel;
    let progressToLevel = (xpLeft / xpNeeded) * 100;
    if(level === 1){
      progressToLevel =  (totalXp / nextLevel) * 100;
    }
    if (level === 60){
        progressToLevel = 100;
    }
    return [progressToLevel, level, nextLevel]
}

export { calculateLevel }