import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const uploadsDirectory = path.join(process.cwd(), "public", "uploads");

export async function getNumberedUploadImages(): Promise<string[]> {
  const entries = await readdir(uploadsDirectory, { withFileTypes: true });

  const images = entries
    .flatMap((entry) => {
      if (!entry.isFile()) return [];

      const match = entry.name.match(/^(\d+)\.[^.]+$/);
      if (!match) return [];

      return [
        {
          number: BigInt(match[1]),
          name: entry.name,
        },
      ];
    })
    .sort((left, right) => {
      if (left.number < right.number) return -1;
      if (left.number > right.number) return 1;
      return left.name.localeCompare(right.name);
    });

  return Promise.all(
    images.map(async ({ name }) => {
      const contents = await readFile(path.join(uploadsDirectory, name));
      // Replacing a file must also change its URL to bypass cached images.
      const version = createHash("sha256").update(contents).digest("hex").slice(0, 16);
      return `/uploads/${encodeURIComponent(name)}?v=${version}`;
    }),
  );
}
