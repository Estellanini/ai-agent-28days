# Code Review Checklist

## Correctness

- Does the change preserve existing behavior?
- Are edge cases handled?
- Are return values and error paths correct?

## Data Loss

- Can user data be overwritten, deleted, truncated, or silently ignored?
- Is migration or backward compatibility needed?

## Security

- Can untrusted input reach shell, filesystem, network, SQL, or secrets?
- Are permissions checked at the right boundary?

## Concurrency

- Can two operations race?
- Are files, sessions, or shared memory mutated safely?

## Error Handling

- Are failures explicit?
- Are retries bounded?
- Does the caller receive actionable errors?

## Tests

- Is there a regression test for changed behavior?
- Do tests cover failure modes?

## Compatibility

- Does the change alter public APIs, file formats, command flags, or persisted state?

