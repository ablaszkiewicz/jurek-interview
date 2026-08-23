import axios from 'axios';
import { useEffect, useState } from 'react';

type PullRequest = {
  id: number;
  title: string;
  author: string;
  repository: string;
  is_from_my_team: boolean;
  is_draft: boolean;
  is_closed: boolean;
  ci_passed: boolean;
  is_approved: boolean;
  is_mine: boolean;
};

// Every field, in one column each, header = the raw field name. No prettifying on purpose.
const COLUMNS: (keyof PullRequest)[] = [
  'id',
  'title',
  'author',
  'repository',
  'is_from_my_team',
  'is_draft',
  'is_closed',
  'ci_passed',
  'is_approved',
  'is_mine',
];

// Tailwind's preflight zeroes out every border, so the borders are spelled out inline here -
// otherwise the table renders as a borderless blob.
const CELL: React.CSSProperties = { border: '1px solid #000', padding: '3px 6px', verticalAlign: 'top' };

// Hardcoded on purpose - no .env files in this task.
const API_URL = 'http://localhost:47101/pull-requests';

export function App() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get<PullRequest[]>(API_URL).then((response) => {
      setPullRequests(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13, padding: 8 }}>
      <h1 style={{ fontSize: 18, fontWeight: 'bold', margin: '0 0 8px' }}>PULL REQUESTS</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
          <thead>
            <tr style={{ background: '#c0c0c0' }}>
              {COLUMNS.map((column) => (
                <th key={column} style={{ ...CELL, textAlign: 'left', whiteSpace: 'nowrap' }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pullRequests.map((pullRequest) => (
              <tr key={pullRequest.id}>
                {COLUMNS.map((column) => (
                  <td key={column} style={CELL}>
                    {String(pullRequest[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
