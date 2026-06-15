/**
 * kill-port.js --- Frees a TCP port before starting the dev server (Windows) ---
 * آزاد کردن پورت قبل از اجرای سرور توسعه (ویندوز)
 */
const { execSync } = require('child_process');

function killPort(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
    const processIds = new Set();

    output.split('\n').forEach((line) => {
      const match = line.trim().match(/LISTENING\s+(\d+)\s*$/);
      if (match) processIds.add(match[1]);
    });

    processIds.forEach((processId) => {
      try {
        execSync(`taskkill /PID ${processId} /F`, { stdio: 'ignore' });
        console.log(`🔪 Freed port ${port} (PID ${processId})`);
      } catch {
        // process may have already exited
      }
    });

    if (processIds.size === 0) {
      console.log(`✓ Port ${port} is free`);
    }
  } catch {
    console.log(`✓ Port ${port} is free`);
  }
}

module.exports = { killPort };
