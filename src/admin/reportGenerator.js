import React, { useState } from 'react';
import API from '../services/api';
import { format } from 'date-fns';

const ReportGenerator = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReport = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await API.get('/admin/reports/utilization', {
        params: { startDate, endDate }
      });
      setReportData(response.data);
    } catch (err) {
      setError('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = ['Date', 'Total Seats', 'Reserved Seats', 'Utilization (%)'];
    const csvContent = [
      headers.join(','),
      ...reportData.map(item => [
        item.date,
        item.totalSeats,
        item.reservedSeats,
        item.utilization.toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `seat-utilization-${startDate}-to-${endDate}.csv`);
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Generate Utilization Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-end space-x-2">
          <button
            onClick={generateReport}
            disabled={loading}
            className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
          {reportData.length > 0 && (
            <button
              onClick={downloadCSV}
              className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Download CSV
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {reportData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((report, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{report.totalSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{report.reservedSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">{report.utilization.toFixed(2)}%</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, report.utilization)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {loading ? 'Generating report...' : 'No report data. Select a date range and generate a report.'}
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;