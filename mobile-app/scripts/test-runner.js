#!/usr/bin/env node

/**
 * PHASE 6 - Test Runner Script
 * Helps execute and document integration tests
 * 
 * Usage:
 *   node scripts/test-runner.js --phase 1       // Run Phase 6.1 (Auth)
 *   node scripts/test-runner.js --phase 2       // Run Phase 6.2 (Member)
 *   node scripts/test-runner.js --phase 3       // Run Phase 6.3 (Admin)
 *   node scripts/test-runner.js --all           // Run all phases
 *   node scripts/test-runner.js --check-api     // Verify APIs
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Test phases
const phases = {
  1: {
    name: 'Authentication Testing',
    file: 'PHASE_6_INTEGRATION_TESTING.md',
    tests: 7,
    time: '31 min',
    tests_list: [
      'AUTH-001: Member Registration',
      'AUTH-002: Admin Registration',
      'AUTH-003: Member Login',
      'AUTH-004: Admin Login',
      'AUTH-005: Logout',
      'AUTH-006: Invalid Credentials',
      'AUTH-007: Network Error Handling'
    ]
  },
  2: {
    name: 'Member Dashboard Testing',
    file: 'PHASE_6_TESTING_CHECKLIST.md',
    tests: 10,
    time: '45 min',
    tests_list: [
      'MEMBER-001: Home Tab Load',
      'MEMBER-002: Home Tab Content',
      'MEMBER-003: Attendance Tab',
      'MEMBER-004: Mark Attendance (QR)',
      'MEMBER-005: Mark Attendance (Manual)',
      'MEMBER-006: History Tab Load',
      'MEMBER-007: History Filter',
      'MEMBER-008: Profile Tab',
      'MEMBER-009: Edit Profile',
      'MEMBER-010: Tab Navigation'
    ]
  },
  3: {
    name: 'Admin Dashboard Testing',
    file: 'PHASE_6_TESTING_CHECKLIST.md',
    tests: 12,
    time: '50 min',
    tests_list: [
      'ADMIN-001: Admin Home Load',
      'ADMIN-002: Home Content',
      'ADMIN-003: Users List',
      'ADMIN-004: Create User',
      'ADMIN-005: Edit User',
      'ADMIN-006: Delete User',
      'ADMIN-007: Search User',
      'ADMIN-008: Courses List',
      'ADMIN-009: Create Course',
      'ADMIN-010: Edit Course',
      'ADMIN-011: Delete Course',
      'ADMIN-012: Reports View'
    ]
  },
  4: {
    name: 'Integration Testing',
    file: 'PHASE_6_TESTING_CHECKLIST.md',
    tests: 8,
    time: '35 min',
    tests_list: [
      'INTEG-001: Admin Creates Course',
      'INTEG-002: Member Sees Course',
      'INTEG-003: Member Marks Attendance',
      'INTEG-004: Admin Sees Attendance',
      'INTEG-005: Real-time Sync',
      'INTEG-006: Data Consistency',
      'INTEG-007: Offline Mode',
      'INTEG-008: Cache Management'
    ]
  },
  5: {
    name: 'Error Handling & Edge Cases',
    file: 'PHASE_6_TESTING_CHECKLIST.md',
    tests: 15,
    time: '25 min',
    tests_list: [
      'ERROR-001: Invalid Email',
      'ERROR-002: Weak Password',
      'ERROR-003: Duplicate Email',
      'ERROR-004: Missing Fields',
      'ERROR-005: Network Timeout',
      'ERROR-006: Firebase Down',
      'ERROR-007: Permission Denied',
      'ERROR-008: Invalid QR Code',
      'ERROR-009: Duplicate Attendance',
      'ERROR-010: Concurrent Operations',
      'ERROR-011: Large Data Set',
      'ERROR-012: Memory Leak',
      'ERROR-013: Session Timeout',
      'ERROR-014: Invalid Token',
      'ERROR-015: Crash Recovery'
    ]
  }
};

// Test results tracking
let testResults = {
  phase: null,
  started: new Date().toISOString(),
  tests: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0
  }
};

// Helper functions
function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function separator() {
  log('═'.repeat(80), 'cyan');
}

function divider() {
  log('─'.repeat(80), 'dim');
}

function success(message) {
  log(`✓ ${message}`, 'green');
}

function error(message) {
  log(`✗ ${message}`, 'red');
}

function warning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ ${message}`, 'blue');
}

function highlight(message) {
  log(`${colors.bright}${message}${colors.reset}`, 'cyan');
}

// Main functions
function showHeader() {
  separator();
  log('', 'cyan');
  log('  🧪 PHASE 6 - INTEGRATION TEST RUNNER', 'cyan');
  log('  Presensia Mobile - Member & Admin Integration', 'cyan');
  log('', 'cyan');
  separator();
}

function showPhaseInfo(phaseNum) {
  const phase = phases[phaseNum];
  if (!phase) {
    error(`Phase ${phaseNum} not found`);
    return;
  }

  log('', 'white');
  log(`Phase 6.${phaseNum}: ${phase.name}`, 'bright');
  log(`File: ${phase.file}`, 'dim');
  log(`Tests: ${phase.tests}`, 'dim');
  log(`Estimated Time: ${phase.time}`, 'dim');
  log('', 'white');

  log('Tests in this phase:', 'cyan');
  phase.tests_list.forEach((test, idx) => {
    log(`  ${idx + 1}. ${test}`, 'white');
  });
}

function recordTestResult(testId, passed, notes = '') {
  const result = {
    id: testId,
    passed,
    timestamp: new Date().toISOString(),
    notes
  };

  testResults.tests.push(result);
  testResults.summary.total++;

  if (passed) {
    testResults.summary.passed++;
  } else {
    testResults.summary.failed++;
  }
}

function showPhaseMenu(phaseNum) {
  const phase = phases[phaseNum];

  log('', 'white');
  log('Test Options:', 'cyan');
  log('  1. View detailed steps', 'white');
  log('  2. Record test results', 'white');
  log('  3. Skip to next phase', 'white');
  log('  4. Exit', 'white');
  log('', 'white');
}

function generateReport() {
  const report = {
    timestamp: testResults.started,
    completed: new Date().toISOString(),
    summary: testResults.summary,
    tests: testResults.tests,
    passRate: (testResults.summary.passed / testResults.summary.total * 100).toFixed(2)
  };

  return report;
}

function saveReport(filename) {
  const report = generateReport();
  const filepath = path.join(__dirname, '..', 'test-results', `${filename}.json`);

  // Create directory if not exists
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
  success(`Report saved to ${filepath}`);
}

function verifyAPIs() {
  separator();
  log('Verifying APIs...', 'cyan');
  log('', 'white');

  const apiFiles = [
    'src/api/auth.api.js',
    'src/api/user.api.js',
    'src/api/course.api.js'
  ];

  apiFiles.forEach(file => {
    const filepath = path.join(__dirname, '..', file);
    if (fs.existsSync(filepath)) {
      success(`${file} found`);
    } else {
      error(`${file} NOT found`);
    }
  });

  log('', 'white');
  log('Expected APIs:', 'cyan');
  log('  Auth: signUp, signIn, signOut, getCurrentUser, updateUser', 'white');
  log('  User: createUser, getAllUsers, getUserById, updateUser, deleteUser', 'white');
  log('  Course: getAllCourses, getCourseByCode, createCourse, updateCourse, deleteCourse', 'white');
  log('', 'white');
}

function verifyScreens() {
  separator();
  log('Verifying Screens...', 'cyan');
  log('', 'white');

  const screens = [
    'src/screens/Auth/Login.jsx',
    'src/screens/admin/Dashboard/index.jsx',
    'src/screens/member/Dashboard/index.jsx'
  ];

  screens.forEach(screen => {
    const filepath = path.join(__dirname, '..', screen);
    if (fs.existsSync(filepath)) {
      success(`${screen} found`);
    } else {
      warning(`${screen} NOT found`);
    }
  });

  log('', 'white');
}

function showPreflightChecklist() {
  separator();
  log('Preflight Checklist', 'cyan');
  log('', 'white');

  const checks = [
    { name: 'Node modules installed', cmd: 'node_modules exists' },
    { name: 'Firebase configured', cmd: 'src/config/firebase.js exists' },
    { name: 'API layer ready', cmd: 'src/api/index.js exists' },
    { name: 'Hooks ready', cmd: 'src/hooks/index.js exists' },
    { name: 'Navigation ready', cmd: 'src/navigation/index.js exists' }
  ];

  checks.forEach(check => {
    const basePath = path.join(__dirname, '..');
    let filepath;

    if (check.cmd.includes('node_modules')) {
      filepath = path.join(basePath, 'node_modules');
    } else if (check.cmd.includes('firebase.js')) {
      filepath = path.join(basePath, 'src', 'config', 'firebase.js');
    } else if (check.cmd.includes('api/index.js')) {
      filepath = path.join(basePath, 'src', 'api', 'index.js');
    } else if (check.cmd.includes('hooks/index.js')) {
      filepath = path.join(basePath, 'src', 'hooks', 'index.js');
    } else if (check.cmd.includes('navigation/index.js')) {
      filepath = path.join(basePath, 'src', 'navigation', 'index.js');
    }

    if (fs.existsSync(filepath)) {
      success(check.name);
    } else {
      error(`${check.name} - ${filepath}`);
    }
  });

  log('', 'white');
}

function showSummary() {
  separator();
  log('Test Summary', 'cyan');
  log('', 'white');

  log(`Total Tests: ${testResults.summary.total}`, 'white');
  log(`Passed: ${testResults.summary.passed}`, 'green');
  log(`Failed: ${testResults.summary.failed}`, testResults.summary.failed > 0 ? 'red' : 'green');
  log(`Skipped: ${testResults.summary.skipped}`, 'yellow');

  const passRate = testResults.summary.total > 0
    ? (testResults.summary.passed / testResults.summary.total * 100).toFixed(2)
    : 0;
  log(`Pass Rate: ${passRate}%`, passRate >= 95 ? 'green' : 'yellow');

  log('', 'white');
}

function showHelp() {
  separator();
  log('Usage:', 'cyan');
  log('', 'white');
  log('  npm run test:phase 1       Run Phase 6.1 (Authentication)', 'white');
  log('  npm run test:phase 2       Run Phase 6.2 (Member Dashboard)', 'white');
  log('  npm run test:phase 3       Run Phase 6.3 (Admin Dashboard)', 'white');
  log('  npm run test:phase 4       Run Phase 6.4 (Integration)', 'white');
  log('  npm run test:phase 5       Run Phase 6.5 (Error Handling)', 'white');
  log('  npm run test:all           Run all phases', 'white');
  log('  npm run test:check-api     Verify APIs', 'white');
  log('  npm run test:check-screens Verify Screens', 'white');
  log('  npm run test:preflight     Run preflight checks', 'white');
  log('', 'white');
  log('Manual Testing:', 'cyan');
  log('  npm start                  Start the app', 'white');
  log('  npm run ios                Run on iOS', 'white');
  log('  npm run android            Run on Android', 'white');
  log('', 'white');
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];
const param = args[1];

showHeader();

if (!command || command === '--help' || command === '-h') {
  showHelp();
} else if (command === '--phase' && param) {
  const phaseNum = parseInt(param);
  if (phases[phaseNum]) {
    showPhaseInfo(phaseNum);
    log('', 'white');
    info('To execute tests:');
    log('  1. Read the detailed steps in ' + phases[phaseNum].file, 'dim');
    log('  2. Start the app: npm start', 'dim');
    log('  3. Follow each test case step by step', 'dim');
    log('  4. Document results', 'dim');
    log('', 'white');
  } else {
    error(`Phase ${phaseNum} not found. Available phases: 1-5`);
  }
} else if (command === '--check-api') {
  verifyAPIs();
} else if (command === '--check-screens') {
  verifyScreens();
} else if (command === '--preflight') {
  showPreflightChecklist();
} else if (command === '--all') {
  showHeader();
  Object.keys(phases).forEach(key => {
    showPhaseInfo(key);
    log('', 'white');
  });
} else {
  warning(`Unknown command: ${command}`);
  log('', 'white');
  showHelp();
}

// Export for use in other scripts
module.exports = {
  recordTestResult,
  generateReport,
  saveReport,
  phases,
  colors,
  log,
  success,
  error,
  warning,
  info
};
