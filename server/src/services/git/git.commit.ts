import { runGitCommand } from '../../utils/command.js';
import { normalizeRepoPath } from '../../utils/file.js';
import { logger } from '../../utils/logger.js';

export class GitCommitManager {
  /**
   * Stage specific resolved files
   */
  async stageFiles(repoPath: string, files: string[]): Promise<void> {
    const normalized = normalizeRepoPath(repoPath);
    if (!files.length) return;

    logger.info(`Staging files: ${files.join(', ')} in ${normalized}`);
    await runGitCommand(['add', ...files], { cwd: normalized });
  }

  /**
   * Commit resolved files with message "resolved merge conflict"
   */
  async commit(repoPath: string, message = 'resolved merge conflict'): Promise<string> {
    const normalized = normalizeRepoPath(repoPath);
    logger.info(`Creating commit in ${normalized}: "${message}"`);

    const { stdout } = await runGitCommand(['commit', '-m', message], {
      cwd: normalized,
    });

    // Get the created commit hash
    const { stdout: commitHash } = await runGitCommand(['rev-parse', 'HEAD'], {
      cwd: normalized,
    });

    logger.info(`Commit created successfully: ${commitHash}`);
    return commitHash.trim();
  }

  /**
   * Safe rollback using git checkout or git stash if needed
   */
  async rollbackFiles(repoPath: string, files: string[]): Promise<void> {
    const normalized = normalizeRepoPath(repoPath);
    logger.info(`Rolling back changes to files: ${files.join(', ')}`);

    for (const file of files) {
      try {
        await runGitCommand(['checkout', 'HEAD', '--', file], { cwd: normalized });
      } catch (err: any) {
        logger.warn(`Failed to checkout file ${file}: ${err.message}`);
      }
    }
  }
}
