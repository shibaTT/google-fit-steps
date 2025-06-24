/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "google-fit-steps"; // GitHubリポジトリ名

const nextConfig = {
    // Cloudflare Workers用: output: undefined, basePath/assetPrefixなし
    // GitHub Pages用: output: "export", basePath/assetPrefixあり
    output: process.env.CF_PAGES ? undefined : "export",
    basePath: process.env.CF_PAGES ? undefined : (isProd ? `/${repoName}` : ""),
    assetPrefix: process.env.CF_PAGES ? undefined : (isProd ? `/${repoName}/` : ""),
    trailingSlash: true,
};

module.exports = nextConfig;
