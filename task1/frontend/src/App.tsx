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
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Pull requests</h1>
      <ul className="divide-y divide-gray-200 border-y border-gray-200">
        {pullRequests.map((pullRequest) => (
          <li key={pullRequest.id} className="py-3">
            <div className="text-gray-900">{pullRequest.title}</div>
            <div className="text-sm text-gray-500">
              {pullRequest.author} · {pullRequest.repository}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
