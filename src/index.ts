#!/usr/bin/env node

import { join } from 'path';
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import degit from 'degit';
import {
    validateKebabCase,
    replaceInFile,
    execCommand,
    checkIfDirectoryExists
} from './utils.js';

async function main() {
    const program = new Command();

    program
        .name('create-react-app')
        .description('🚀 CLI para criar aplicações React baseadas no template Herval')
        .version('1.0.0')
        .argument('[project-name-here]', 'Nome do projeto (kebab-case)')
        .action(async (projectNameArg) => {degit
            console.log(chalk.blue.bold('\n🚀 Bem-vindo ao CLI de criação de aplicações React Herval!\n'));

            let projectName = projectNameArg;

            // Se não passou o nome via argumento, perguntar
            if (!projectName) {
                const nameAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'projectName',
                        message: '📝 Digite o nome do projeto (kebab-case):',
                        validate: (value) => {
                            if (value.trim() === '') return '❌ Nome do projeto é obrigatório';
                            if (!validateKebabCase(value)) {
                                return '❌ Nome do projeto deve estar em kebab-case (ex: meu-projeto-react)';
                            }
                            return true;
                        }
                    }
                ]);
                projectName = nameAnswer.projectName;
            } else {
                // Validar o nome passado como argumento
                if (!validateKebabCase(projectName)) {
                    console.log(chalk.red('\n❌ Nome do projeto deve estar em kebab-case (ex: meu-projeto-react)'));
                    process.exit(1);
                }
            }

            // Prompt para título e descrição
            const responses = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectTitle',
                    message: '📝 Digite o título do projeto:',
                    validate: (value) => value.trim() !== '' || '❌ Título do projeto é obrigatório'
                },
                {
                    type: 'input',
                    name: 'projectDescription',
                    message: '📝 Digite a descrição do projeto:',
                    validate: (value) => value.trim() !== '' || '❌ Descrição do projeto é obrigatória'
                }
            ]);

            const { projectTitle, projectDescription } = responses;
            const targetDir = join(process.cwd(), projectName);

            // Check if directory already exists
            if (await checkIfDirectoryExists(targetDir)) {
                console.log(chalk.red(`\n❌ Diretório "${projectName}" já existe!`));
                process.exit(1);
            }

            // Download template from GitHub
            const spinner = ora('📦 Baixando template...').start();
            try {
                const emitter = degit('github:mateusseger/react-template', {
                    cache: false,
                    force: true,
                    verbose: false
                });

                await emitter.clone(targetDir);
                spinner.succeed(chalk.green('✅ Template baixado com sucesso!'));
            } catch (error) {
                spinner.fail(chalk.red('❌ Erro ao baixar template'));
                console.log(chalk.yellow('\n💡 Tentando método alternativo com git clone...'));

                try {
                    await execCommand(`git clone https://github.com/mateusseger/react-template.git "${projectName}"`, process.cwd());
                    spinner.succeed(chalk.green('✅ Template baixado com sucesso!'));
                } catch (gitError) {
                    console.error(chalk.red('\n❌ Não foi possível baixar o template.'));
                    console.error(chalk.yellow('\nVerifique se:'));
                    console.error(chalk.white('  • O repositório existe: https://github.com/mateusseger/react-template'));
                    console.error(chalk.white('  • Você tem acesso ao repositório'));
                    console.error(chalk.white('  • Sua conexão com internet está funcionando'));
                    process.exit(1);
                }
            }

            // Replace placeholders in files
            spinner.text = '⚙️ Configurando projeto...';
            spinner.start();

            // package.json
            try {
                await replaceInFile(
                    join(targetDir, 'package.json'),
                    [
                        { from: '[project-name-here]', to: projectName },
                        { from: '[project-description-here]', to: projectDescription }
                    ]
                );
            } catch (error) {
                spinner.fail(chalk.red('❌ Erro ao configurar package.json'));
                console.error(error);
                process.exit(1);
            }

            // index.html
            try {
                await replaceInFile(
                    join(targetDir, 'index.html'),
                    [{ from: '[project-title-here]', to: projectTitle }]
                );
            } catch (error) {
                spinner.fail(chalk.red('❌ Erro ao configurar index.html'));
                console.error(error);
                process.exit(1);
            }

            // .gitlab-ci.yml (if exists)
            try {
                await replaceInFile(
                    join(targetDir, '.gitlab-ci.yml'),
                    [{ from: '[project-name-here]', to: projectName }]
                );
            } catch (error) {
                // File might not exist, that's ok
            }

            // app-config.ts
            try {
                await replaceInFile(
                    join(targetDir, 'src', 'app', 'app-config.ts'),
                    [{ from: '[project-title-here]', to: projectTitle }]
                );
            } catch (error) {
                spinner.fail(chalk.red('❌ Erro ao configurar app-config.ts'));
                console.error(error);
                process.exit(1);
            }

            spinner.succeed(chalk.green('✅ Projeto configurado com sucesso!'));

            // Install dependencies
            spinner.text = '📦 Instalando dependências (pnpm install)...';
            spinner.start();

            try {
                await execCommand('pnpm install', targetDir);
                spinner.succeed(chalk.green('✅ Dependências instaladas com sucesso!'));
            } catch (error) {
                spinner.fail(chalk.red('❌ Erro ao instalar dependências'));
                console.error(error);
                process.exit(1);
            }

            // Success message
            console.log(chalk.green.bold('\n✨ Projeto criado com sucesso!\n'));
            console.log(chalk.cyan('Para começar a desenvolver:'));
            console.log(chalk.white(`  cd ${projectName}`));
            console.log(chalk.white('  pnpm run dev\n'));

            // Ask if user wants to start dev server now
            const { startDev } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'startDev',
                    message: '🚀 Deseja iniciar o servidor de desenvolvimento agora?',
                    default: true
                }
            ]);

            if (startDev) {
                console.log(chalk.blue('\n🚀 Iniciando servidor de desenvolvimento...\n'));
                try {
                    await execCommand('pnpm run dev', targetDir, { stdio: 'inherit' });
                } catch (error) {
                    console.error(chalk.red('❌ Erro ao iniciar servidor'));
                    process.exit(1);
                }
            }
        });

    program.parse();
}

main().catch((error) => {
    console.error(chalk.red('\n❌ Erro inesperado:'));
    console.error(error);
    process.exit(1);
});
