const { execSync } = require('child_process');

// 获取命令行参数，默认路径是 modules/resource
const targetPath = process.argv[2] || 'modules/resource';

try {
  console.log(`🚀 Generating Nest module at path: ${targetPath}`);
  execSync(`npx nest g resource ${targetPath}`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Generation failed:', error.message);
  process.exit(1);
}
