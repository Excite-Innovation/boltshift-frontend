# Version Control Workflow

### Key rules

- Short-lived branches
- One feature per branch or follow tasks on Linear
- For discovered work, create and document a task in Linear
- Make sure main is protected from direct pushes

### Main branches

- main/master for production
- preview for integration

---

### 1. Creating and Selecting Branches

- Create branches from main using the GitHub interface
- Select it using Source Control Checkout on VS Code UI


### 2. Commit & Push

- Stage the changes using the "+" icon on View > Source Control UI on VS Code
- Use small, clear commits with descriptive messages via VS Code Source Control
- Copy ticket details into ChatGPT, generate a commit message, review it, then use it
- Use Commit and Push found under Source Control UI on VS Code


### 3. Pull Request Merge Strategy

#### branch → preview

- Select base: preview and compare: feature branches
- Review diff
- Create Pull Request
- Rebase and Merge
- Delete remote branch immediately

#### preview → main

- Select base: main and compare: preview branches
- Review diff
- Create Pull Request
- Copy ticket details into ChatGPT, generate a PR title message, review it, then use it
- Rebase and Merge
- Keep preview branch in the project


### 4. Cleanup

- Switch branches to preview or main using Source Control Checkout on VS Code UI
- Sync changes / git pull to get latest updates

```bash
git branch -D branch-name
git fetch --prune
