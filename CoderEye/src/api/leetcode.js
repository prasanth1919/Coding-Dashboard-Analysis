const BASE_URL = 'http://localhost:3000';

// Function to fetch user profile details
export async function fetchLeetCodeProfile(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}`);
    console.log(`Fetching LeetCode profile for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode profile');
    }
    const data = await response.json();
    return {
      username: data.username,
      name: data.name,
      ranking: data.ranking,
      country: data.country,
      avatar: data.avatar,
    };
  } catch (error) {
    console.error('Error fetching LeetCode profile:', error);
    throw error;
  }
}

// Function to fetch badges earned by the user
export async function fetchLeetCodeBadges(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/badges`);
    console.log(`Fetching LeetCode badges for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode badges');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode badges:', error);
    throw error;
  }
}

// Function to fetch number of questions solved by the user
export async function fetchLeetCodeSolvedCount(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/solved`);
    console.log(`Fetching LeetCode solved count for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode solved count');
    }
    const data = await response.json();
    return data.total_solved;
  } catch (error) {
    console.error('Error fetching LeetCode solved count:', error);
    throw error;
  }
}

// Function to fetch contest participation details of the user
export async function fetchLeetCodeContest(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/contest`);
    console.log(`Fetching LeetCode contest participation for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode contest participation');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode contest participation:', error);
    throw error;
  }
}

// Function to fetch contest history of the user
export async function fetchLeetCodeContestHistory(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/contest/history`);
    console.log(`Fetching LeetCode contest history for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode contest history');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode contest history:', error);
    throw error;
  }
}

// Function to fetch the last 20 submissions of the user
export async function fetchLeetCodeSubmissions(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/submission`);
    console.log(`Fetching LeetCode submissions for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode submissions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode submissions:', error);
    throw error;
  }
}

// Function to fetch a specified number of the user's last submissions
export async function fetchLeetCodeLimitedSubmissions(username, limit) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/submission?limit=${limit}`);
    console.log(`Fetching LeetCode limited submissions for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode limited submissions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode limited submissions:', error);
    throw error;
  }
}

// Function to fetch the last 20 accepted submissions of the user
export async function fetchLeetCodeAcceptedSubmissions(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/acSubmission`);
    console.log(`Fetching LeetCode accepted submissions for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode accepted submissions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode accepted submissions:', error);
    throw error;
  }
}

// Function to fetch a specified number of the user's last accepted submissions
export async function fetchLeetCodeLimitedAcceptedSubmissions(username, limit) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/acSubmission?limit=${limit}`);
    console.log(`Fetching LeetCode limited accepted submissions for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode limited accepted submissions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode limited accepted submissions:', error);
    throw error;
  }
}

// Function to fetch the user's submission calendar
export async function fetchLeetCodeCalendar(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/calendar`);
    console.log(`Fetching LeetCode calendar for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode calendar');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode calendar:', error);
    throw error;
  }
}

// Function to fetch the full profile details in one call
export async function fetchLeetCodeFullProfile(username) {
  try {
    const response = await fetch(`${BASE_URL}/userProfile/${username}`);
    console.log(`Fetching LeetCode full profile for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode full profile');
    }
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode full profile:', error);
    throw error;
  }
}

// Function to fetch the user's submission calendar for a specific year
export async function fetchLeetCodeYearCalendar(username, year) {
  try {
    const response = await fetch(`${BASE_URL}/userProfileCalendar?username=${username}&year=${year}`);
    console.log(`Fetching LeetCode calendar for ${username} in ${year}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode calendar for year');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode calendar for year:', error);
    throw error;
  }
}

// Function to fetch language stats of a user
export async function fetchLeetCodeLanguageStats(username) {
  try {
    const response = await fetch(`${BASE_URL}/languageStats?username=${username}`);
    console.log(`Fetching LeetCode language stats for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode language stats');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode language stats:', error);
    throw error;
  }
}

// Function to fetch user question progress
export async function fetchLeetCodeQuestionProgress(userSlug) {
  try {
    const response = await fetch(`${BASE_URL}/userProfileUserQuestionProgressV2/${userSlug}`);
    console.log(`Fetching LeetCode question progress for ${userSlug}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode question progress');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode question progress:', error);
    throw error;
  }
}

// Function to fetch skill stats of a user
export async function fetchLeetCodeSkillStats(username) {
  try {
    const response = await fetch(`${BASE_URL}/skillStats/${username}`);
    console.log(`Fetching LeetCode skill stats for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode skill stats');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode skill stats:', error);
    throw error;
  }
}

// Function to fetch contest details by contest slug
export async function fetchLeetCodeContestDetails(contestSlug) {
  try {
    const response = await fetch(`${BASE_URL}/contest/${contestSlug}`);
    console.log(`Fetching LeetCode contest details for ${contestSlug}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode contest details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode contest details:', error);
    throw error;
  }
}

// Function to fetch contest ranking by contest slug
export async function fetchLeetCodeContestRanking(contestSlug) {
  try {
    const response = await fetch(`${BASE_URL}/contestRanking/${contestSlug}`);
    console.log(`Fetching LeetCode contest ranking for ${contestSlug}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode contest ranking');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode contest ranking:', error);
    throw error;
  }
}

// Function to fetch user contest ranking info by username
export async function fetchLeetCodeUserContestRankingInfo(username) {
  try {
    const response = await fetch(`${BASE_URL}/userContestRankingInfo/${username}`);
    console.log(`Fetching LeetCode user contest ranking info for ${username}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode user contest ranking info');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode user contest ranking info:', error);
    throw error;
  }
}

// Function to fetch trending discussions
export async function fetchLeetCodeTrendingDiscussions(first) {
  try {
    const response = await fetch(`${BASE_URL}/trendingDiscuss?first=${first}`);
    console.log(`Fetching LeetCode trending discussions: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode trending discussions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode trending discussions:', error);
    throw error;
  }
}

// Function to fetch discussion topic by topicId
export async function fetchLeetCodeDiscussTopic(topicId) {
  try {
    const response = await fetch(`${BASE_URL}/discussTopic/${topicId}`);
    console.log(`Fetching LeetCode discussion topic ${topicId}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode discussion topic');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode discussion topic:', error);
    throw error;
  }
}

// Function to fetch discussion comments by topicId
export async function fetchLeetCodeDiscussComments(topicId) {
  try {
    const response = await fetch(`${BASE_URL}/discussComments/${topicId}`);
    console.log(`Fetching LeetCode discussion comments for topic ${topicId}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode discussion comments');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode discussion comments:', error);
    throw error;
  }
}

// Function to fetch raw daily problem
export async function fetchLeetCodeDailyProblem() {
  try {
    const response = await fetch(`${BASE_URL}/dailyQuestion`);
    console.log(`Fetching LeetCode raw daily problem: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode raw daily problem');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode raw daily problem:', error);
    throw error;
  }
}

// Function to fetch the daily question
export async function fetchLeetCodeDailyQuestion() {
  try {
    const response = await fetch(`${BASE_URL}/daily`);
    console.log(`Fetching LeetCode daily question: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode daily question');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode daily question:', error);
    throw error;
  }
}

// Function to fetch details about a selected question by title slug
export async function fetchLeetCodeSelectedQuestion(titleSlug) {
  try {
    const response = await fetch(`${BASE_URL}/select?titleSlug=${titleSlug}`);
    console.log(`Fetching LeetCode selected question ${titleSlug}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode selected question');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode selected question:', error);
    throw error;
  }
}

// Function to fetch a list of problems
export async function fetchLeetCodeProblems() {
  try {
    const response = await fetch(`${BASE_URL}/problems`);
    console.log(`Fetching LeetCode problems: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode problems');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode problems:', error);
    throw error;
  }
}

// Function to fetch a specified number of problems
export async function fetchLeetCodeLimitedProblems(limit) {
  try {
    const response = await fetch(`${BASE_URL}/problems?limit=${limit}`);
    console.log(`Fetching LeetCode limited problems: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode limited problems');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode limited problems:', error);
    throw error;
  }
}

// Function to fetch a list of problems based on selected tags
export async function fetchLeetCodeFilteredProblems(tags) {
  try {
    const response = await fetch(`${BASE_URL}/problems?tags=${tags}`);
    console.log(`Fetching LeetCode filtered problems: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode filtered problems');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode filtered problems:', error);
    throw error;
  }
}

// Function to fetch a list of problems based on selected tags and limit
export async function fetchLeetCodeFilteredLimitedProblems(tags, limit) {
  try {
    const response = await fetch(`${BASE_URL}/problems?tags=${tags}&limit=${limit}`);
    console.log(`Fetching LeetCode filtered and limited problems: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode filtered and limited problems');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode filtered and limited problems:', error);
    throw error;
  }
}
