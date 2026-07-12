import type { App } from "@slack/bolt";
import type { CommandConfig, CommandCategory } from "../types";

const registry: CommandConfig[] = [];

export function registerCommand(config: CommandConfig) {
  registry.push(config);
}

export function getCommandsByCategory(): Record<CommandCategory, CommandConfig[]> {
  const result: Partial<Record<CommandCategory, CommandConfig[]>> = {};
  for (const cmd of registry) {
    if (!result[cmd.category]) {
      result[cmd.category] = [];
    }
    (result[cmd.category] as CommandConfig[]).push(cmd);
  }
  return result as Record<CommandCategory, CommandConfig[]>;
}

export function getAllCommands(): CommandConfig[] {
  return registry;
}

export function registerAllCommands(app: App) {
  for (const cmd of registry) {
    app.command(cmd.name, cmd.handler);
  }
}
