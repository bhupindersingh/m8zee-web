
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

  // 3. Find the category with the highest score (winning cluster)
  const categories = Object.keys(scores);
  let winner = categories[0] || "";
  let highestVal = -1;

  for (const category in scores) {
    if (scores[category] > highestVal) {
      highestVal = scores[category];
      winner = category;
    }
  }

  // 4. Find the highest scoring question (trait) within the winning cluster
  const winningClusterQuestions = questions.filter(q => q.cluster === winner);
  let topQuestion = winningClusterQuestions[0];
  let maxQuestionScore = -1;

  winningClusterQuestions.forEach(q => {
    const score = answers[q.id] || 0;
    if (score > maxQuestionScore) {
      maxQuestionScore = score;
      topQuestion = q;
    }
  });

  // 5. Map the winning trait ID to the 9 Archetype Names
  const archetypeMapping = {
    q1: "The Anchor",
    q2: "The Vault",
    q3: "The Real One",
    q4: "The Deep One",
    q5: "The Empath",
    q6: "The Secure One",
    q7: "The Safe Space",
    q8: "The Rock",
    q9: "The Spark"
  };

  const finalArchetype = topQuestion ? (archetypeMapping[topQuestion.id] || "The Anchor") : "The Anchor";

  // Return everything to the app
  return {
    scores: scores,
    userScores: answers,
    topCategory: winner,
    archetype: finalArchetype,
    percentage: totalPercentage,
    totalScore: totalSum
  };
}

// Export at the end for clean structure
export { calculateResults };

