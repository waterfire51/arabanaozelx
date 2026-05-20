import {
  assetPath,
  buildProductAssetPath,
  githubAssetsOwner,
  githubAssetsRepo,
  githubAssetsToken,
  normalizeStoredAssetPath,
  type AssetFolder
} from "@/lib/assets";

type GithubContentResponse = {
  sha?: string;
};

function githubApiBase() {
  return `https://api.github.com/repos/${githubAssetsOwner()}/${githubAssetsRepo()}`;
}

function authHeaders() {
  const token = githubAssetsToken();
  if (!token) {
    throw new Error("GITHUB_TOKEN tanımlı değil.");
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "arabanaozel-assets"
  };
}

async function getExistingSha(repoPath: string) {
  const response = await fetch(`${githubApiBase()}/contents/${encodeURIComponent(repoPath)}`, {
    headers: authHeaders()
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub içerik okunamadı (${response.status}): ${body}`);
  }

  const data = (await response.json()) as GithubContentResponse;
  return data.sha;
}

export async function uploadAssetToGithub(params: {
  repoPath: string;
  buffer: Buffer;
  message: string;
}) {
  const repoPath = normalizeStoredAssetPath(params.repoPath);
  const sha = await getExistingSha(repoPath);
  const body: Record<string, string> = {
    message: params.message,
    content: params.buffer.toString("base64")
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(`${githubApiBase()}/contents/${encodeURIComponent(repoPath)}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub yükleme başarısız (${response.status}): ${text}`);
  }

  const data = (await response.json()) as {
    content?: { path?: string };
  };

  return {
    path: data.content?.path || repoPath,
    publicUrl: assetPath(repoPath)
  };
}

export async function uploadProductImage(params: {
  slug: string;
  filename: string;
  buffer: Buffer;
}) {
  const repoPath = buildProductAssetPath(params.slug, params.filename);
  return uploadAssetToGithub({
    repoPath,
    buffer: params.buffer,
    message: `upload: ${repoPath}`
  });
}

export async function uploadToAssetFolder(params: {
  folder: AssetFolder;
  filename: string;
  buffer: Buffer;
}) {
  const repoPath = `${params.folder}/${params.filename.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  return uploadAssetToGithub({
    repoPath,
    buffer: params.buffer,
    message: `upload: ${repoPath}`
  });
}
