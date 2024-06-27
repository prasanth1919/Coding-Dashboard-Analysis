const CODEFORCES_BASE_URL = 'https://codeforces.com/api';

// Function to fetch Codeforces user information
export async function fetchCodeforcesUserInfo(handle) {
  try {
    const response = await fetch(`${CODEFORCES_BASE_URL}/user.info?handles=${handle}&checkHistoricHandles=false`);
    console.log(`Fetching Codeforces user info for ${handle}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch Codeforces user info');
    }
    const data = await response.json();
    if (data.status !== 'OK' || !data.result || data.result.length === 0) {
      throw new Error('User info not found');
    }
    const user = data.result[0]; // Assuming only one handle is provided
    return {
      handle: user.handle,
      name: user.firstName + ' ' + user.lastName, // Concatenate first name and last name
      rating: user.rating,
      country: user.country,
      avatar: user.titlePhoto,
    };
  } catch (error) {
    console.error('Error fetching Codeforces user info:', error);
    throw error;
  }
}


// Function to fetch number of Codeforces user solved problems
export async function fetchCodeforcesSolvedProblemsCount(handle) {
  try {
    const response = await fetch(`${CODEFORCES_BASE_URL}/user.status?handle=${handle}&from=1`);
    console.log(`Fetching Codeforces solved problems count for ${handle}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch Codeforces solved problems');
    }
    const data = await response.json();
    if (data.status !== 'OK') {
      throw new Error('Solved problems count not available');
    }
    // Count the number of submissions that were accepted
    const solvedCount = data.result.filter(submission => submission.verdict === 'OK').length;
    return solvedCount;
  } catch (error) {
    console.error('Error fetching Codeforces solved problems count:', error);
    throw error;
  }
}

export async function fetchSubmittedProblems(handle) {
  try {
    const response = await fetch(`${CODEFORCES_BASE_URL}/user.status?handle=${handle}&from=1`);
    console.log(`Fetching Codeforces submitted problems for ${handle}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch Codeforces submitted problems');
    }
    const data = await response.json();
    if (data.status !== 'OK') {
      throw new Error('Submitted problems not available');
    }
    // Create a list of submitted problem names where the verdict is "OK"
    const submittedProblems = data.result
      .filter(submission => submission.verdict === 'OK')
      .map(submission => submission.problem.name);
    return submittedProblems;
  } catch (error) {
    console.error('Error fetching Codeforces submitted problems:', error);
    throw error;
  }
}

export async function fetchSubmittedProblemsWithTags(handle) {
  try {
    const response = await fetch(`${CODEFORCES_BASE_URL}/user.status?handle=${handle}&from=1`);
    console.log(`Fetching Codeforces submitted problems with tags for ${handle}: `, response);
    if (!response.ok) {
      throw new Error('Failed to fetch Codeforces submitted problems with tags');
    }
    const data = await response.json();
    if (data.status !== 'OK') {
      throw new Error('Submitted problems with tags not available');
    }
    // Create a list of submitted problems with tags where the verdict is "OK"
    const submittedProblemsWithTags = data.result
      .filter(submission => submission.verdict === 'OK' && submission.problem.tags.length > 0)
      .map(submission => submission.problem.tags);
    return submittedProblemsWithTags;
  } catch (error) {
    console.error('Error fetching Codeforces submitted problems with tags:', error);
    throw error;
  }
}

// Function to fetch topic-wise statistics for the user
export async function fetchTopicWise(handle) {
  try {
    const submittedProblemsWithTags = await fetchSubmittedProblemsWithTags(handle);

    // Count topics and questions per topic
    const topicsMap = new Map();

    submittedProblemsWithTags.forEach(tags => {
      tags.forEach(tag => {
        if (topicsMap.has(tag)) {
          const count = topicsMap.get(tag);
          topicsMap.set(tag, count + 1);
        } else {
          topicsMap.set(tag, 1);
        }
      });
    });

    // Convert topicsMap to an array of objects for easier manipulation
    const topicsList = Array.from(topicsMap).map(([topic, count]) => ({
      topic,
      count,
    }));

    return {
      totalTopics: topicsList.length,
      topicsList,
    };
  } catch (error) {
    console.error('Error fetching topic-wise statistics:', error);
    throw error;
  }
}