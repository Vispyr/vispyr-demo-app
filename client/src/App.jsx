import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  Network,
  RotateCcw,
} from 'lucide-react';

const App = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const API_BASE_URL = 'http://<insert ec2 instance IP>:3001/api';

  const handleApiCall = async (endpoint, buttonKey, buttonName) => {
    setLoading((prev) => ({ ...prev, [buttonKey]: true }));

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();

      setResults((prev) => ({
        ...prev,
        [buttonKey]: {
          success: response.ok,
          message: data.message || `${buttonName} completed`,
          data: data,
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [buttonKey]: {
          success: false,
          message: `Error: ${error.message}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [buttonKey]: false }));
    }
  };

  const resetResults = () => {
    setResults({});
  };

  const ResultMessage = ({ result }) => {
    if (!result) return null;

    return (
      <div
        className={`mt-2 p-3 rounded-md flex items-center space-x-2 ${result.success
            ? 'bg-green-100 border border-green-200'
            : 'bg-red-100 border border-red-200'
          }`}
      >
        {result.success ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-600" />
        )}
        <div className="flex-1">
          <p
            className={`text-sm font-medium ${result.success ? 'text-green-800' : 'text-red-800'
              }`}
          >
            {result.message}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {result.timestamp}
            {result.data?.duration && ` • ${result.data.duration}ms`}
          </p>
        </div>
      </div>
    );
  };

  const TestButton = ({
    onClick,
    loading,
    children,
    icon: Icon,
    disabled = false,
  }) => (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`w-full p-3 rounded-md border transition-colors flex items-center space-x-2 ${loading || disabled
          ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
    >
      {loading ? (
        <Clock className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      <span>{children}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Telemetry Testing Dashboard
          </h1>
          <p className="text-gray-600">
            Test various scenarios for observability data: traces, profiles, and
            metrics
          </p>
          <button
            onClick={resetResults}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset All Results</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Scenarios */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="h-5 w-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Profile Scenarios
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/profile/efficient-sort',
                        'efficientSort',
                        'Efficient Sort'
                      )
                    }
                    loading={loading.efficientSort}
                    icon={Cpu}
                  >
                    Efficient Sort (QuickSort)
                  </TestButton>
                  <ResultMessage result={results.efficientSort} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/profile/slow-sort',
                        'slowSort',
                        'Slow Sort'
                      )
                    }
                    loading={loading.slowSort}
                    icon={Cpu}
                  >
                    Slow Sort (BubbleSort)
                  </TestButton>
                  <ResultMessage result={results.slowSort} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/profile/long-function',
                        'longFunction',
                        'Long Function'
                      )
                    }
                    loading={loading.longFunction}
                    icon={Clock}
                  >
                    Long Function (60s)
                  </TestButton>
                  <ResultMessage result={results.longFunction} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/profile/heap-break',
                        'heapBreak',
                        'Heap Break'
                      )
                    }
                    loading={loading.heapBreak}
                    icon={Cpu}
                  >
                    Heap Break
                  </TestButton>
                  <ResultMessage result={results.heapBreak} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/profile/stack-break',
                        'stackBreak',
                        'Stack Break'
                      )
                    }
                    loading={loading.stackBreak}
                    icon={Cpu}
                  >
                    Stack Break
                  </TestButton>
                  <ResultMessage result={results.stackBreak} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/profile/recursive',
                        'recursive',
                        'Recursive Function'
                      )
                    }
                    loading={loading.recursive}
                    icon={Cpu}
                  >
                    Recursive Function
                  </TestButton>
                  <ResultMessage result={results.recursive} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/profile/cpu-intensive',
                        'cpuIntensive',
                        'CPU Intensive'
                      )
                    }
                    loading={loading.cpuIntensive}
                    icon={Cpu}
                  >
                    CPU Intensive Task
                  </TestButton>
                  <ResultMessage result={results.cpuIntensive} />
                </div>
              </div>
            </div>
          </div>

          {/* Trace Scenarios */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Network className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Trace Scenarios
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/trace/database-query',
                        'databaseQuery',
                        'Database Query'
                      )
                    }
                    loading={loading.databaseQuery}
                    icon={Database}
                  >
                    Query Database
                  </TestButton>
                  <ResultMessage result={results.databaseQuery} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/trace/multiple-retries',
                        'multipleRetries',
                        'Multiple Retries'
                      )
                    }
                    loading={loading.multipleRetries}
                    icon={RotateCcw}
                  >
                    Multiple Retries
                  </TestButton>
                  <ResultMessage result={results.multipleRetries} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/trace/internal-service',
                        'internalService',
                        'Internal Service'
                      )
                    }
                    loading={loading.internalService}
                    icon={Network}
                  >
                    Internal Service Call
                  </TestButton>
                  <ResultMessage result={results.internalService} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/trace/network-latency',
                        'networkLatency',
                        'Network Latency'
                      )
                    }
                    loading={loading.networkLatency}
                    icon={Network}
                  >
                    Network Latency Test
                  </TestButton>
                  <ResultMessage result={results.networkLatency} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/complex-operation',
                        'complexOperation',
                        'Complex Operation'
                      )
                    }
                    loading={loading.complexOperation}
                    icon={Network}
                  >
                    Complex Operation
                  </TestButton>
                  <ResultMessage result={results.complexOperation} />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Scenarios */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Metrics Scenarios
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall(
                        '/metrics/simulate-traffic',
                        'simulateTraffic',
                        'Simulate Traffic'
                      )
                    }
                    loading={loading.simulateTraffic}
                    icon={Network}
                  >
                    Simulate High Traffic
                  </TestButton>
                  <ResultMessage result={results.simulateTraffic} />
                </div>

                <div>
                  <TestButton
                    onClick={() =>
                      handleApiCall('/break-app', 'breakApp', 'Break App')
                    }
                    loading={loading.breakApp}
                    icon={Network}
                  >
                    Break Application
                  </TestButton>
                  <ResultMessage result={results.breakApp} />
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                  <p className="font-medium mb-2">Additional Metrics Tests:</p>
                  <ul className="space-y-1">
                    <li>• CPU spikes from Profile scenarios</li>
                    <li>• Memory usage from Heap Break</li>
                    <li>• Request rates from Traffic simulation</li>
                    <li>• Error rates from Retry scenarios</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                System Information
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Main API:</span>
                  <span className="font-mono">:3001</span>
                </div>
                <div className="flex justify-between">
                  <span>External Service:</span>
                  <span className="font-mono">:3002</span>
                </div>
                <div className="flex justify-between">
                  <span>Internal Service:</span>
                  <span className="font-mono">:3003</span>
                </div>
                <div className="flex justify-between">
                  <span>Database:</span>
                  <span className="font-mono">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
