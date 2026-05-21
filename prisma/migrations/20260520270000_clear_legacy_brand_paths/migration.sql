UPDATE "SiteSettings"
SET
  "logoPath" = CASE
    WHEN "logoPath" IN ('site_gorsel/logo.png', 'site_gorsel/ddark.png') THEN ''
    ELSE "logoPath"
  END,
  "faviconPath" = CASE
    WHEN "faviconPath" IN ('site_gorsel/logo.png', 'site_gorsel/ddark.png') THEN ''
    ELSE "faviconPath"
  END,
  "updatedAt" = NOW()
WHERE "id" = 'default';
