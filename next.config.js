/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const repoName = 'google-fit-steps'; // GitHubリポジトリ名

const nextConfig = {
  output: 'export',
  // GitHub Pages用にbasePath/assetPrefixを設定
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  // 404.html出力
  trailingSlash: true,
};

module.exports = nextConfig;
