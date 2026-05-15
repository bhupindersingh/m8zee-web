
function calculateResults(answers, questions) {
  const categoryTotals = {};
  const categoryCounts = {};

  // 1. Dynamically group scores by cluster from the questions data
  questions.forEach(q => {
    const score = answers[q.id] || 0;
    const category = q.cluster;

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
      categoryCounts[category] = 0;
    }

    categoryTotals[category] += score;
    categoryCounts[category] += 1;
  });

  // 2. Calculate the averages
  const scores = {};
  let totalSum = 0;
  let totalCount = 0;

  for (const category in categoryTotals) {
    const avg = categoryTotals[category] / categoryCounts[category];
    scores[category] = Math.round(avg * 10) / 10;
    totalSum += categoryTotals[category];
    totalCount += categoryCounts[category];
  }

  const totalPercentage = Math.round((totalSum / (totalCount * 10)) * 100);
  console.log("Archetype Calculation - Scores:", scores);

  // 3. Find the category with the highest score
  const categories = Object.keys(scores);
  let winner = categories[0] || "";
  let highestVal = -1;

  for (const category in scores) {
    if (scores[category] > highestVal) {
      highestVal = scores[category];
      winner = category;
    }
  }

  // 4. Match the winner to an Archetype Name
  const archetypes = {
    Reliability: "The Rock",
    Emotional: "The Deep One",
    Social: "The Spark"
  };

  // Return everything to the app
  return {
    scores: scores,
    topCategory: winner,
    archetype: archetypes[winner] || "The Anchor",
    percentage: totalPercentage,
    totalScore: totalSum
  };
}

// Export at the end for clean structure
export { calculateResults };
