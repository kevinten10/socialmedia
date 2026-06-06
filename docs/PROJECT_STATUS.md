# Project Status

Last checked: 2026-06-06

## Repository

- GitHub: https://github.com/kevinten10/socialmedia
- Default branch: `master`
- Local branch: `master`
- Current remote: `origin https://github.com/kevinten10/socialmedia.git`
- GitHub state at last check: public repository, no open pull requests, no open issues

## Modules

### Java social automation

- Build file: `pom.xml`
- Java target: 17
- Main package: `com.github.kevinten10.social`
- Current implemented integration: Twitter status publishing through Twitter4J
- Credentials source: environment variables, not source files

Required Twitter environment variables:

```bash
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_TOKEN_SECRET
```

Copy `.env.example` into your local environment manager or shell profile and replace the placeholder values. Do not commit real credentials.

Validation:

```bash
./mvnw test
```

On Windows PowerShell:

```powershell
.\mvnw.cmd test
```

The repository includes Maven Wrapper configured for Maven 3.9.9, so a global Maven installation is not required.

### Remotion video generator

- Path: `video-generator`
- Framework: Remotion 4, React, TypeScript
- Main composition: `KevinPromo`
- Demo compositions: `DailyReport`, `SystemArchitecture`, `ProjectCollaboration`, `AudioVisualizer`, `ThreeDScene`, `GlobeDataFlow`, `ScrollSimulation`

Validation:

```bash
cd video-generator
npm run typecheck
npx remotion still src/index.tsx KevinPromo %TEMP%/socialmedia-kevinpromo-frame120.png --frame=120 --scale=0.25
```

Preview:

```bash
cd video-generator
npm start
```

Render:

```bash
cd video-generator
npm run render
```

## Public Repository Safety

- Real account data must stay out of Git.
- Tracked account files are examples only:
  - `src/main/java/com/github/kevinten10/social/twitter/account.example.json`
  - `src/main/java/com/github/kevinten10/social/instagram/account.example.json`
- Local private account files are ignored:
  - `account.json`
  - `account.local.json`
  - `account.private.json`

## Known Limits

- The Java side is currently a small automation foundation, not a complete Spring Boot application.
- Twitter API access depends on valid platform permissions and may fail even with correct local code.
- Instagram has account metadata and prompt notes, but no implemented sender yet.
- The Remotion project has type checking and still-frame validation, but no automated visual regression suite.

## Continuous Integration

Workflow: `.github/workflows/ci.yml`

Triggers:

- Pushes to `master`
- Pull requests

Checks:

- Java tests with Temurin Java 17 and Maven Wrapper
- Remotion dependency install with Node.js 24
- Remotion TypeScript typecheck
- Remotion still-frame render for `KevinPromo` at frame 120
