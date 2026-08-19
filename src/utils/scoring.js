
function calculateResults(answers, questions) {
  // 1. Calculate total score and percentage
  let totalSum = 0;
  let totalCount = 0;

  questions.forEach(q => {
    const score = answers[q.id] || 0;
    totalSum += score;
    totalCount += 1;
  });

  const totalPercentage = Math.round((totalSum / (totalCount * 10)) * 100);

  // 2. Find the question with the highest score (direct 1:1 archetype mapping)
  let topQuestion = null;
  let maxScore = -1;

  questions.forEach(q => {
    const score = answers[q.id] || 0;
    if (score > maxScore) {
      maxScore = score;
      topQuestion = q;
    }
  });

  // 3. Map the winning question ID to the 9 Archetype Names
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

  console.log("Archetype Calculation - Top question:", topQuestion?.id, "score:", maxScore, "→", finalArchetype);
  console.log("Archetype Calculation - All answers:", answers);

  // Return everything to the app
  return {
    scores: answers,
    userScores: answers,
    topCategory: topQuestion?.id || "",
    archetype: finalArchetype,
    percentage: totalPercentage,
    totalScore: totalSum
  };
}

// Export at the end for clean structure
export { calculateResults };
