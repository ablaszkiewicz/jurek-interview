import axios from 'axios';
import { useEffect, useState } from 'react';

type PullRequest = {
  id: number;
  title: string;
  author: string;
  repository: string;
};

// Hardcoded on purpose - no .env files in this task.
const API_URL = 'http://localhost:3000/pull-requests';

export function App() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  useEffect(() => {
    axios.get<PullRequest[]>(API_URL).then((response) => setPullRequests(response.data));
  }, []);

  return (
    <div>
      <h1>Pull requests</h1>
      <ul>
        {pullRequests.map((pullRequest) => (
          <li key={pullRequest.id}>
            {pullRequest.title} - {pullRequest.author} ({pullRequest.repository})
          </li>
        ))}
      </ul>
    </div>
  );
}
