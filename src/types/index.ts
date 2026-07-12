import type { App } from "@slack/bolt";

export type CommandCategory = "Utility" | "Fun" | "Knowledge" | "Media" | "Personality";

export interface CommandConfig {
  name: string;
  category: CommandCategory;
  description: string;
  handler: Parameters<App["command"]>[1];
}
