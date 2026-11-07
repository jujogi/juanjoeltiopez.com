# Coding Principles

How to work on this codebase, before and while writing code. Adapted from
[forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)
(MIT), which draws on Andrej Karpathy's observations of where LLM coding
agents go wrong:

> "The models make wrong assumptions on your behalf and just run along with
> them without checking. They don't manage their confusion, don't seek
> clarifications, don't surface inconsistencies, don't present tradeoffs,
> don't push back when they should."

> "They really like to overcomplicate code and APIs, bloat abstractions, don't
> clean up dead code... implement a bloated construction over 1000 lines when
> 100 would do."

> "They still sometimes change/remove comments and code they don't
> sufficiently understand as side effects, even if orthogonal to the task."

| Principle             | Addresses                                              |
| --------------------- | ------------------------------------------------------ |
| Think Before Coding   | Wrong assumptions, hidden confusion, missing tradeoffs |
| Simplicity First      | Overcomplication, bloated abstractions                 |
| Surgical Changes      | Orthogonal edits, touching code you shouldn't          |
| Goal-Driven Execution | Tests-first, verifiable success criteria               |
| Approval Before Git   | Unreviewed commits, pushes and pull requests           |

These bias toward caution over speed. For trivial tasks (a typo, an obvious
one-liner), use judgment: the goal is fewer costly mistakes on non-trivial
work, not slowing down simple tasks.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- **State assumptions explicitly.** If uncertain, ask rather than guess.
- **Present multiple interpretations.** Don't pick one silently when the
  request is ambiguous.
- **Push back when warranted.** If a simpler approach exists, say so.
- **Stop when confused.** Name what's unclear and ask for clarification.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If 200 lines could be 50, rewrite it.

**The test:** would a senior engineer say this is overcomplicated? If yes,
simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match the existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:

- Remove imports, variables and functions that _your_ changes made unused.
- Don't remove pre-existing dead code unless asked.

**The test:** every changed line should trace directly to the request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Turn imperative tasks into verifiable goals:

| Instead of...    | Transform to...                                       |
| ---------------- | ----------------------------------------------------- |
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug"    | "Write a test that reproduces it, then make it pass"  |
| "Refactor X"     | "Ensure tests pass before and after"                  |

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

This repo has no tests and no TypeScript. The checks are `npm run build`,
`npm run lint` (no new problems), a clean dev server log, `npx prettier --check` on the files you touched and, for UI, a look
at the running app at desktop, 390px and 330px. See
`.claude/frontend-best-practices.md` › 9.

Strong success criteria let the work loop independently; weak ones ("make it
work") need constant clarification.

## 5. Approval Before Git

**Never commit, push or open a pull request without our approval.**

- Leave changes uncommitted in the working tree for us to review.
- Commit only when we say to commit; push only when we say to push; open a
  PR only when we say to open one. Approval to commit is not approval to
  push, and approval to push is not approval to open a PR.
- Approval covers the change it was given for, not the next one.

---

## How to know it's working

- Fewer unnecessary changes in diffs — only requested changes appear.
- Fewer rewrites due to overcomplication — code is simple the first time.
- Clarifying questions come before implementation, not after mistakes.
- Clean, minimal PRs — no drive-by refactoring or "improvements".
