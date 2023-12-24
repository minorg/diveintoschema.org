import WebDataCommonsClassGeneralStats from "../models/WebDataCommonsClassGeneralStats";

export default function TypeGeneralStatsTable(
  generalStats: WebDataCommonsClassGeneralStats
) {
  return (
    <table>
      <tbody>
        <tr>
          <td className="border px-2">Found on unique hosts</td>
          <td className="border px-2">{generalStats.hosts.toLocaleString()}</td>
        </tr>
        <tr>
          <td className="border px-2">Found on unique URLs</td>
          <td className="border px-2">{generalStats.urls.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  );
}
