# Node.js Initial Project Setup

1. Install Node.js
   - Go to the official website: nodejs.org
   - Click on Pre-built Installer.
   - Select your operating system (Windows / Mac / Linux).
   - Download the LTS version (Use Latest & Long Term Support - Recommended).
   - Install it on your system.

2. Verify Node.js Installation
   - On Terminal or Command Prompt run the command:
     ```bash
     node -v
     ```
   - It should show the installed version (Example: v20.1.2) cross check with latest stable version available. This means Node.js is successfully installed.

3. Create Project Folder
   - Create a new folder (Example: `nodejs-backend-production`).
   - Open this folder in VS Code.

4. Initialize npm Project
   - Open Terminal in the project folder.
   - Run the command:
     ```bash
     npm init -y
     ```

5. Fill Project Details (During npm init)
   - Package name: `node-backend-productiongrade` (or your choice)
     - In `Node.js.` Rules of Package Naming is descriptive lowercase only name and uses `-` instead of spaces (e.g `mavlynx-backend`)
     - For Multiple Packages / Monorepo use scoped packages (`@mavlynx/backend`, `@mavlynx/frontend`, `@mavlynx/shared`)
     - For a single backend project, use `mavlynx-backend` but if you have multiple packages under the same organization, use `@mavlynx/backend`.
   - Version: Keep default
     - Node.js packages typically follow Semantic Versioning (SemVer) Format: `MAJOR.MINOR.PATCH` (Example: `1.0.0`)
       1. PATCH is for bug fixes only. Its backward compatible and no becking changes are there (`1.0.0` → `1.0.1`)
       2. MINOR is for New features, but no breaking changes. (`1.0.1` → `1.1.0`)
       3. MAJOR is for Breaking changes. (`1.1.0` → `2.0.0`)
     - Many developers start with `{ "version": "1.0.0" }`
     - Pre-release Versions, Before a stable release:
       - `1.0.0-alpha.1` [early development]
       - `1.0.0-beta.1` [feature complete, tcdesting]
       - `1.0.0-rc.1` [release candidate]
       - `1.0.0` [released version]
   - Description: Optional, Add project description or press Enter to skip
   - Entry point: main file for the project `src/main.js`
   - Test command: shell command that will run the project with test script
   - Git repository: Optional
   - Keywords: Optional
   - Author: Optional
   - License: Keep default (press Enter)
   - Confirm with `yes`

6. Update Scripts in package.json
   - Open `package.json` file.
   - In the `scripts` section, change `"test"` to `"start"`:
     ```json
     {
       "scripts": {
         "dev": "tsx watch src/index.ts",
         "build": "tsc",
         "start": "node dist/index.js"
       }
     }
     ```

7. Create index.js File
   - Create a new file named `main.js`
   - Add this code:
     ```js
     console.log(getTimeStamp() + "MavLynx started running");
     ```

8. Run the Project
   - In terminal, run:
     ```bash
     npm start
     ```

# Git & GitHub Setup

1. Check Git Installation

2. Initialize Git Repository
   - Open Terminal in your project folder and Run the command to creates a local Git repository.
     ```bash
     git init
     ```

3. Add Files to Staging and Commit
   - Run the command:
     ```bash
     git add .
     git commit -m "feat: node project setup"
     ```
   - Use prefix followed by a meaningful message.

4. Create Repository on GitHub
   - Go to github.com and log in.
   - Click on New Repository.
   - Give the repository the same name as your project (Example: `MavLynx/Backend`).
   - Keep it Public.
   - Click Create Repository.

5. Link Local Repository to GitHub
   - Copy the repository URL from GitHub.
   - Run the command in your terminal:
     ```bash
     git remote add origin <paste-your-repo-url-here>
     ```

6. Push Code to GitHub
   - Run the command:
     ```bash
     git push origin main
     ```
   - This will push your initial commit to GitHub.

7. Verify
   - Refresh your GitHub repository page.
   - You should see your project files there.

# Husky Setup

## Git Hooks

- Git Hooks are scripts that run automatically when certain Git actions happen.
- Example: `git commit -> run lint -> commit succeeds/fails`

### Common Git Hooks

- `pre-commit` → before a commit
- `commit-msg` → validate commit message
- `pre-push` → before pushing to remote
- `post-checkout` → after switching branches
- `post-merge` → after pulling/merging
- `pre-rebase` → before a rebase

### Most Used in Node.js

- `pre-commit` → ESLint, Prettier
- `commit-msg` → Commitlint
- `pre-push` → Tests, TypeScript checks

## Husky

- Husky is a tool that simplifies managing Git Hooks in Node.js projects and automatically runs commands when Git events happen.
- Example: running `git commit` with a pre-commit hook runs `npm run lint`; if it succeeds, the commit is created.

### Mental Model

- Git Hook = trigger
- Husky = tool that manages Git Hooks

## Steps to Setup Husky

### 1. Install Husky

Run the command:

```bash
npm install --save-dev husky
```

### 2. Add script

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### 3. Run the prepare script

```bash
npm run prepare
```

This:

- Creates Husky's internal `.husky/_` directory
- Configures Git to use Husky hooks

### 4. Create a custom Husky Git Hook

```bash
touch .husky/pre-commit
```

### 5. Add commands to the hook

File: `.husky/pre-commit`

```sh
#!/bin/sh

echo "Running pre-commit hook"
```

### 6. Make the hook executable (Linux/macOS)

```bash
chmod +x .husky/pre-commit
```

### 7. Test the hook

```bash
git add .
git commit -m "test"
```

Output:

```text
Running pre-commit hook
[master (root-commit) ...] test
```

## Notes

- Edit files like `.husky/pre-commit`, `.husky/pre-push`, and `.husky/commit-msg`.
- Do not edit files inside `.husky/_`.
- The `prepare` script only needs to be run once per repository setup.
- Future `npm install` runs automatically execute the `prepare` script.

## Why Use Husky?

- Husky helps run checks (like formatting or linting) before committing code.
- This prevents bad or erroneous code from being pushed to GitHub.

For example, before every commit, Husky can:

- Run ESLint, Prettier and tests before commit
- Prevent bad commits

### Without Husky

Running:

```bash
git commit -m "add user api"
```

The commit succeeds even if your code has lint errors.

### With Husky

Running:

```bash
git commit -m "add user api"
```

can first execute:

```bash
npm run lint
```

If lint fails, the commit is blocked until you fix the issues.

## When Should You Use It?

Use Husky when:

- Working on a serious project
- Working with a team
- You want code quality checks before commits

For a small learning project, you can skip it initially and add it later. It becomes more useful once ESLint, Prettier, and tests are configured.

# lint-staged

- This assumes Husky is already configured correctly.

## What is lint-staged?

- with `lint-staged` we can runs commands only on staged files.

```bash
git add src/user.ts
git commit -m "update user"
```

Only `src/user.ts` is staged so only it will be linted. This makes commits faster and avoids checking unrelated files.

- Without `lint-staged` the entire project is linted which takes a lot of time when the codebase is very large.
  With `lint-staged`:

## How Husky and lint-staged Work Together

```text
git commit -> Husky pre-commit hook -> lint-staged -> ESLint / Prettier runs on staged files -> commit succeeds or fails
```

## lint-staged Setup

1. Install lint-staged `npm install --save-dev lint-staged`

2. Add lint-staged Configuration : Add to `package.json`:

3. Update the Husky Hook
   Open `.husky/pre-commit` and add shell command tha will run after hook gets triggered replace its contents with:

```json
{
  "lint-staged": {
    "src/**/*.ts": ["eslint --fix"]
  }
}
```

## 4. Test

Stage a file:

```bash
git add src/user.ts
```

Commit:

```bash
git commit -m "test lint-staged"
```

Flow: `git commit -> pre-commit hook -> npx lint-staged -> eslint --fix src/user.ts -> commit succeeds`

## Example with ESLint and Prettier

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

During commit: ` git commit -> eslint --fix -> prettier --write -> commit succeeds`

Benefits:

- Faster commits
- Better developer experience
- Automatic fixes before commit
- Prevents bad code from entering the repository

# TypeScript Setup

### Why Use TypeScript?

- JavaScript is dynamic typed and can cause issues in large projects.
- TypeScript provides type checking, catches errors at compile time, and reduces runtime errors.
- Better for large-scale, production-level applications.

### Steps to Setup TypeScript:

    1. Install TypeScript as dev dependency `npm install typescript --save-dev`
    2. Create tsconfig.json `npx tsc --init`
    3. Configure tsconfig.json us TS Playground to configure
    4. Install Node Types : Install types for JS libraries only

- Search : `npm search @types/package-name`
- Install : `npm install --save-dev @types/package-name`

# Nodemon Setup

1. Install Nodemon and ts-node: `npm install nodemon ts-node --save-dev`

- `nodemon` — Automatically restarts your application when files change during development.
- `ts-node` — Runs TypeScript files directly in Node.js without compiling them to JavaScript first.

2. Update Scripts in package.json

```json
{
  "scripts": {
    "dev": "nodemon src/index.ts", // Start development server
    "start": "node dist/index.js", // Run production build
    "build": "tsc", // Compile TypeScript
    "clean": "rm -rf dist", // Remove generated files
    "lint": "eslint .", // Check code quality
    "lint:fix": "eslint . --fix", // Automatically fix lint issues
    "format": "prettier . --write", // Format code with Prettier
    "format:check": "prettier . --check", // Verify formatting
    "test": "jest", // Run tests
    "typecheck": "tsc --noEmit" // Run TypeScript type checking only
  }
}
```

3. Test the Setup: `npm run dev`
4. Build the Project: `npm run build`
   - This creates a `dist` folder with compiled JavaScript (`index.js`).
5. Test production build: `npm start`

# Module-Based Project Structure

Instead of organizing the application using separate global folders such as `controllers`, `models`, `services`, and `routes`, the project can be structured using a module-based architecture.

In a module-based approach, each feature or domain of the application is placed inside its own folder. A module contains all files related to that feature, including controllers, services, repositories, models, routes, validations, types, and other supporting files.

As File Naming Convention Standard Practices, To maintain consistency across all modules, files should follow a suffix-based naming convention that clearly identifies their responsibility.

To organize Shared Files, files that are used by multiple modules should not be placed inside a specific module. Instead, they should be organized in dedicated shared directories at the root of the `src` folder.

Common responsibilities:

- `config/` – Application configuration, environment variables, database configuration, third-party service configuration, etc.
- `constants/` – Shared constants, application messages, enums, status codes, roles, permissions, and other reusable constant values.
- `middlewares/` – Authentication, authorization, logging, error handling, and other shared middleware.
- `types/` – Global TypeScript types, interfaces, and declaration files.
- `utils/` – Reusable helper functions and utility classes.

Example:

```text
src/
├── modules/
│   ├── module-a/
|   │   ├── module.controller.ts
|   │   ├── module.service.ts
|   │   ├── module.repository.ts
|   │   ├── module.model.ts
|   │   ├── module.routes.ts
|   │   ├── module.validation.ts
|   │   └── module.types.ts
│   ├── module-b/
│   └── module-c/
├── config/
├── constants/
├── middlewares/
├── types/
├── utils/
└── server.ts
```

## Module-Specific vs Shared Files

A simple guideline:

- If a file is used only by a single module, keep it inside that module.
- If a file is shared across multiple modules, move it to a common root-level directory.

This helps maintain clear ownership of code while avoiding duplication.

## Benefits

- Keeps related code together.
- Improves project organization.
- Reduces navigation between multiple folders.
- Makes file responsibilities easy to identify.
- Avoids duplication of shared code.
- Makes the codebase easier to maintain.
- Scales better as new features are added.
- Encourages separation of concerns and feature ownership.

This approach is commonly used in modern production applications because it provides better maintainability and scalability compared to traditional folder-by-layer structures.

## Import Convention

A consistent import strategy improves code readability and maintainability.

### Named Imports for Feature-Specific Code

For business logic and feature-related files such as services, repositories, models, controllers, and routes, prefer named imports.

Example:

```ts
import { createUser, getUserById } from "./user.service.js";
import { UserModel } from "./user.model.js";
```

Benefits:

- Clearly shows which exports are being used.
- Makes dependencies explicit.
- Encourages importing only what is needed.
- Works well for feature-specific modules with a limited number of exports.

### Namespace Imports for Shared Utilities and Constants

For shared utility modules, helper functions, constants, and similar reusable resources, namespace imports can improve readability and reduce import clutter.

Example:

```ts
import * as passwordUtils from "@/utils/password.js";
import * as responseMessages from "@/constants/response-message.js";
import * as dateUtils from "@/utils/date.js";
```

Usage:

```ts
passwordUtils.hashPassword(password);
responseMessages.USER_CREATED;
dateUtils.formatDate(date);
```

Benefits:

- Reduces lengthy import lists.
- Makes the source of functions and constants immediately recognizable.
- Prevents naming collisions.
- Groups related functionality under a meaningful namespace.

### Recommended Approach

Use a combination of both styles:

- Feature-specific modules (services, repositories, models, controllers, routes) → Named imports.
- Shared utilities, helper libraries, constants, and common functions → Namespace imports.

This approach provides a good balance between explicit dependencies and clean, maintainable imports in large TypeScript applications.

## What is Commit Lint?

- It helps maintain clean and structured commit history by enforcing proper commit message format.
- Forces developers to follow standard prefixes like `feat:`, `fix:`, `docs:`, etc.
- Makes commit messages consistent and organized.

## Steps to Setup Commit Lint:

1. Install Required Packages : `npm install @commitlint/cli @commitlint/config-conventional --save-dev `

2. Create Commit Message Hook
   - Go to `.husky` folder.
   - Create a new file: `.husky/commit-msg`
   - Add the command for things to do before commit:
     ```bash
     #!/usr/bin/env sh
     . "$(dirname -- "$0")/_/husky.sh"
     npx --no -- commitlint --edit ${1}
     ```

3. Create Commit Lint Configuration
   - Add configuration in the root folder inside: `commitlint.config.js`
     ```js
     module.exports = {
       extends: ["@commitlint/cli", "@commitlint/config-conventional"],
       rules: {
         "type-enum": [
           2,
           "always",
           ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"],
         ],
         "subject-case": [2, "always", "sentence-case"],
       },
     };
     ```

4. Test Commit Lint
   1. Stage files: `git add .`

   2. Add commit
   - wrong commit: `git commit -m "false commit"` → It will show error (subject cannot be empty, type missing, case issue).
   - correct commit: `git commit -m "feat: commit lint setup"` → Commit will succeed.

### Conventional Commit Types

1. feat : A new feature is added.
2. fix : A bug is fixed.
3. docs : Documentation changes only.
4. style : Code formatting changes with no logic changes.
5. refactor : Code restructuring without changing behavior.
6. perf : Performance improvements.
7. test : Adding or updating tests.
8. build : Changes to build tools or dependencies.
9. ci : Changes to CI/CD configuration.
10. chore : Maintenance tasks that do not affect application code.
11. revert : Reverts a previous commit.

# ESLint Setup

## Why ESLint?

- It enforces good coding practices.
- Helps find bad practices, unused code, and potential errors.

## Steps to Setup ESLint:

1. Install ESLint Packages
   - Run the command: `npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev`

2. Create ESLint Configuration
   - Create a file in the root directory: `.eslintrc.js`
   - Add the following configuration:

     ```js
     import js from "@eslint/js";
     import tseslint from "typescript-eslint";

     export default tseslint.config(
       js.configs.recommended,

       {
         files: ["**/*.ts"],

         languageOptions: {
           parserOptions: {
             project: "./tsconfig.json",
             tsconfigRootDir: import.meta.dirname,
           },
         },

         rules: {
           "no-console": "error",
           quotes: ["error", "single"],
         },
       }
     );
     ```

3. Add Scripts in package.json
   - Add these scripts:
     ```json
     "lint": "eslint .",
     "lint:fix": "eslint . --fix"
     ```

4. Setup lint-staged (for Husky)
   - Open `package.json` and add/update:
     ```json
     "lint-staged": {
       "*.ts": "eslint --fix"
     }
     ```

5. Update pre-commit Hook
   - Go to `.husky/pre-commit` file.
   - Add this command:`npx lint-staged`

6. Install VS Code Extensions (Recommended)
   - Install ESLint extension by Microsoft.
   - Install Error Lens extension (Optional).

7. Test ESLint
   - Run lint command:`npm run lint`
   - Run auto-fix:`npm run lint:fix`

8. Test with Commit
   - Stage files: `git add .`
   - Commit:`git commit -m "feat: eslint setup"`
   - If there are lint errors (like `console.log` or double quotes), commit will fail.
   - Fix the errors and commit again.

# Prettier Setup

- This is Part 9 of the Complete Node.js Production Setup Series.
- In this video, we will setup Prettier (Code Formatter).

## What is Prettier?

- Prettier is a code formatter.
- It automatically formats your code to keep it consistent (indentation, quotes, brackets, semicolons, etc.).

## Steps to Setup Prettier:

1. Install Prettier
   - Run the command: `npm install prettier --save-dev`

2. Install VS Code Extension `Prettier`

3. Create Prettier Configuration
   - Create a file in the root directory: `.prettierrc`
   - Add the following rules:
     ```json
     {
       "semi": true,
       "singleQuote": false,
       "tabWidth": 2,
       "useTabs": false,
       "printWidth": 120,
       "trailingComma": "es5",
       "bracketSpacing": true,
       "arrowParens": "always",
       "quoteProps": "as-needed",
       "endOfLine": "lf"
     }
     ```

4. Integrate Prettier with ESLint
   - Install the integration package: `npm install eslint-config-prettier --save-dev`
   - Open `.eslintrc.js` and add `'prettier'` to the `extends` array (at the end):
     ```js
     extends: [
       'eslint:recommended',
       'plugin:@typescript-eslint/recommended',
       'prettier'
     ]
     ```

5. Add Scripts in package.json
   - Add these scripts:
     ```json
     "format": "prettier --check .",
     "format:fix": "prettier --write ."
     ```

6. Update lint-staged in package.json
   - Update `lint-staged` to include Prettier:
     ```json
     "lint-staged": {
       "*.ts": ["eslint --fix", "prettier --write"]
     }
     ```

7. Update pre-commit Hook (`.husky/pre-commit`)

- Make sure it co
  `npx lint-staged`

8. Test Prettier
   - Save the file (`Ctrl + S`) → Prettier should auto-format it.
   - Run format che `npm run format`
   - Run auto-fix`npm run format:fix`

9. Test with Commit
   - Stage fil `git add .`
   - Commit`git commit -m "feat: prettier setup"`
   - Prettier + ESLint will run automatically before commit.

# Use of Different Environment Files in Node.js

Node.js provides built-in support for loading environment variables from a file using the `--env-file` flag. This allows different environment configurations to be used for development and production

## package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon --exec \"node --env-file=.env.development --loader ts-node/esm\" src/server.ts",
    "build": "tsc",
    "start": "node --env-file=.env.production dist/server.js"
  }
}
```

## Development Environment

When running: `npm run dev` Node loads variables from: `.env.development` and All variables defined in the file are automatically available through: `process.env`

Example:

```env
PORT=3000
DATABASE_URL=postgres://localhost:5432/app_db
```

```ts
console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);
```

- Production Environment : When running: `npm start` Node loads variables from: `.env.production` This allows production-specific values to be used without modifying the application code.
- Build Process : When running: `npm run build` TypeScript only compiles the source code `tsc`.No environment file is loaded during the build process.The build step generates JavaScript files in the `dist` directory and does not require runtime configuration values.

## Deployment

In most production deployments, environment variables are provided by the hosting platform rather than a local `.env.production` file. Examples include Docker, Kubernetes, Railway, Render, Fly.io, AWS, DigitalOcean. These platforms inject variables directly into: `process.env`. Therefore, a deployed application can access configuration values without requiring any `.env` file on the server.
