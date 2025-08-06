const axios = require('axios');

const generateTestArray = (size = 100) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100000));
};

const quickSort = (arr = null) => {
  if (arr === null) {
    arr = generateTestArray();
  }

  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === Math.floor(arr.length / 2)) continue;

    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

const bubbleSort = (arr = null) => {
  if (arr === null) {
    arr = generateTestArray();
  }

  const sortedArr = [...arr];
  const n = sortedArr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sortedArr[j] > sortedArr[j + 1]) {
        const temp = sortedArr[j];
        sortedArr[j] = sortedArr[j + 1];
        sortedArr[j + 1] = temp;
      }
    }
  }

  return sortedArr;
};

const longRunningTask = async () => {
  const startTime = Date.now();
  const targetDuration = 60000;

  return new Promise((resolve) => {
    const performWork = () => {
      const currentTime = Date.now();

      if (currentTime - startTime >= targetDuration) {
        resolve({
          completed: true,
          duration: currentTime - startTime,
          iterations: Math.floor((currentTime - startTime) / 100),
        });
      } else {
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
          sum += Math.sqrt(i);
        }

        setTimeout(performWork, 100);
      }
    };

    performWork();
  });
};

const createHeapStress = () => {
  const arrays = [];
  const targetSize = 50;

  try {
    for (let i = 0; i < targetSize; i++) {
      const largeArray = new Array(1000000).fill(0).map(() => Math.random());
      arrays.push(largeArray);
    }

    let sum = 0;
    arrays.forEach((arr) => {
      sum += arr.reduce((a, b) => a + b, 0);
    });

    return {
      memoryUsed: `${targetSize}MB (approximate)`,
      arraysCreated: arrays.length,
      totalSum: sum,
    };
  } catch (error) {
    return {
      memoryUsed: 'Memory limit reached',
      arraysCreated: arrays.length,
      error: error.message,
    };
  }
};

const createStackOverflow = () => {
  const maxDepth = 1000000;
  let currentDepth = 0;

  const recursiveFunction = (depth) => {
    currentDepth = Math.max(currentDepth, depth);

    if (depth >= maxDepth) {
      return depth;
    }

    const result = Math.sqrt(depth) + Math.sin(depth);

    return recursiveFunction(depth + 1) + result;
  };

  try {
    const result = recursiveFunction(0);
    return {
      depth: currentDepth,
      result: result,
      success: true,
    };
  } catch (error) {
    return {
      depth: currentDepth,
      error: error.message,
      success: false,
    };
  }
};

const deepRecursion = (levels, current = 0) => {
  if (current >= levels) {
    return current;
  }

  const computation = Math.pow(current, 2) + Math.sqrt(current + 1);

  return computation + deepRecursion(levels, current + 1);
};

const cpuBoundTask = () => {
  const startTime = Date.now();
  let calculations = 0;

  while (Date.now() - startTime < 10000 && calculations < 10000000) {
    const n = Math.random() * 1000;
    Math.sqrt(n);
    Math.sin(n);
    Math.cos(n);
    Math.tan(n);
    Math.log(n);
    calculations++;
  }

  return calculations;
};

const simulateHighTraffic = async () => {
  const requests = [];
  const requestCount = 10000;
  const baseUrl = 'http://localhost:3001';

  const startTime = Date.now();

  for (let i = 0; i < requestCount; i++) {
    const requestPromise = axios
      .get(`${baseUrl}/health`, {
        timeout: 5000,
      })
      .then((response) => {
        return {
          success: true,
          status: response.status,
          responseTime: Date.now() - startTime,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.message,
          responseTime: Date.now() - startTime,
        };
      });

    requests.push(requestPromise);
  }

  try {
    const results = await Promise.all(requests);
    const successfulRequests = results.filter((r) => r.success);
    const avgResponseTime =
      successfulRequests.reduce((sum, r) => sum + r.responseTime, 0) /
      successfulRequests.length;

    return {
      requestsProcessed: results.length,
      successfulRequests: successfulRequests.length,
      avgResponseTime: avgResponseTime,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      requestsProcessed: 0,
      error: error.message,
      duration: Date.now() - startTime,
    };
  }
};

const simulateProcessingTime = (min = 100, max = 1000) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const generateMockData = (count = 10) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString(),
  }));
};

const primeFilter = (num) => {
  const limit = Math.floor(Math.sqrt(num)) + 1;
  let isPrime = Array(limit).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 0; i < Math.sqrt(limit); i += 1) {
    if (isPrime[i] === false) continue;
    let factor = 0;
    while (i ** 2 + i * factor <= limit) {
      isPrime[i ** 2 + i * factor] = false;
      factor += 1;
    }
  }
  let primes = isPrime.map((b, i) => (b ? i : -1)).filter((i) => i > 0);
  let highPrimes = [primes];

  let low = limit;
  let high = 2 * limit;

  while (low < num) {
    if (high > num) high = num;

    const isHighPrime = Array(high - low).fill(true);
    let newPrimes = [];
    for (const p of primes) {
      let start = Math.ceil(low / p) * p;
      if (start < p * p) start = p * p;

      for (let j = start; j < high; j += p) {
        isHighPrime[j - low] = false;
      }
    }

    for (let i = low; i < high; i++) {
      if (isHighPrime[i - low]) newPrimes.push(i);
    }
    highPrimes.push(newPrimes);
    low += limit;
    high += limit;
    console.log('checkpoint', low);
  }

  return highPrimes;
};

const primeMedian = (num) => {
  const primeList = primeFilter(num);
  const lengths = primeList.map((list) => list.length);
  let length = 0;

  lengths.forEach((l) => (length += l));

  const target = length % 2 === 0 ? length / 2 : (length + 1) / 2;
  let idx = 0;
  let count = 0;

  while (count + lengths[idx] < target) {
    count += lengths[idx];
    idx += 1;
  }

  const first = primeList[idx][target - count - 1];
  const second =
    target - count < lengths[idx]
      ? primeList[idx][target - count]
      : primeList[idx + 1][0];
  const median = length % 2 === 0 ? [first, second] : [first];

  return median;
};

module.exports = {
  quickSort,
  bubbleSort,
  longRunningTask,
  createHeapStress,
  createStackOverflow,
  deepRecursion,
  cpuBoundTask,
  simulateHighTraffic,
  simulateProcessingTime,
  generateMockData,
  generateTestArray,
  primeMedian,
};
