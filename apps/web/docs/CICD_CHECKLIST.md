---
description: Comprehensive CI/CD Checklist for Sage Design Engine Release
---

# Sage Design Engine CI/CD Release Checklist

This workflow tracks the full release process from code changes to npm publication.

## 1. Preparation
- [x] **Verify Current State:** Checked `CHANGELOG.md` and confirmed v1.0.0-rc.1 enterprise readiness.
- [x] **Review Changes:** Confirmed all codebase changes (React 19, WebGL optimization, Tests) are present.
- [x] **Create Changeset:** Generate the changeset file to trigger the versioning process.

## 2. CI Automation (Pull Request)
- [x] **Push Changes:** Commit and push the feature branch (v1.0.0-rc.1 code + changeset).
- [ ] **Create PR:** Open a Pull Request to `main`.
- [ ] **CI Checks:**
    - [ ] `build` job succeeds (all packages).
    - [ ] `test` job succeeds (63 tests).
    - [ ] `size:check` job succeeds (bundle limits).
- [ ] **Merge PR:** Merge the feature branch into `main`.

## 3. Versioning (System Action)
- [ ] **"Version Packages" PR Created:** The `Release` workflow runs and creates/updates a PR titled "Version Packages".
    - *Note: This PR consumes the changeset and updates package.json versions + CHANGELOG.md dates.*
- [ ] **Review Version PR:** Verify the version bumps and changelog updates.
- [ ] **Merge Version PR:** Merge "Version Packages" into `main`.

## 4. Deployment & Release (System Action)
- [ ] **Release Workflow Runs:** Triggered by the merge of the Version PR.
- [ ] **Vercel Deployment:** The `apps/web` (Sage Studio) acts as the canary.
    - [ ] Verify production deployment on `thesage.dev`.
- [ ] **NPM Publish:** The workflow runs `pnpm release` (via `changeset publish`).
    - [ ] Verify `@thesage/ui` is published to npm.
    - [ ] Verify other packages are published if updated.

## 5. Verification
- [ ] **Propagate:** Ensure the new version is available for consumption.
- [ ] **External Test:** (Optional) Verify in a fresh consumer app as per Enterprise Plan.
