import { readFile, writeFile, access } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Validates if a string is in kebab-case format
 */
export function validateKebabCase(value: string): boolean {
    const kebabCaseRegex = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
    return kebabCaseRegex.test(value);
}

/**
 * Replaces placeholders in a file
 */
export async function replaceInFile(
    filePath: string,
    replacements: Array<{ from: string; to: string }>
): Promise<void> {
    try {
        let content = await readFile(filePath, 'utf-8');

        for (const { from, to } of replacements) {
            content = content.replaceAll(from, to);
        }

        await writeFile(filePath, content, 'utf-8');
    } catch (error) {
        throw new Error(`Failed to replace in file ${filePath}: ${error}`);
    }
}

/**
 * Executes a shell command in a specific directory
 */
export async function execCommand(
    command: string,
    cwd: string,
    options: { stdio?: 'inherit' | 'pipe' } = { stdio: 'pipe' }
): Promise<void> {
    if (options.stdio === 'inherit') {
        return new Promise((resolve, reject) => {
            const child = exec(command, { cwd });

            child.stdout?.pipe(process.stdout);
            child.stderr?.pipe(process.stderr);

            child.on('exit', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Command failed with exit code ${code}`));
                }
            });

            child.on('error', reject);
        });
    } else {
        try {
            await execAsync(command, { cwd });
        } catch (error) {
            throw new Error(`Command failed: ${command}\n${error}`);
        }
    }
}

/**
 * Checks if a directory exists
 */
export async function checkIfDirectoryExists(path: string): Promise<boolean> {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}
