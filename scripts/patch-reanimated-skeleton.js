const fs = require("node:fs");
const path = require("node:path");

const packagePath = path.resolve(
  "node_modules",
  "react-native-reanimated-skeleton",
);

if (!fs.existsSync(packagePath)) {
  throw new Error(
    "react-native-reanimated-skeleton is not installed; cannot configure its Expo gradient import.",
  );
}

let patchedFiles = 0;
let alreadyPatched = false;

function patchDirectory(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      patchDirectory(entryPath);
      continue;
    }

    if (!/\.(?:js|jsx|ts|tsx)$/.test(entry.name)) {
      continue;
    }

    const source = fs.readFileSync(entryPath, "utf8");
    const patchedSource = source.replace(
      /import\s+LinearGradient\s+from\s+(["'])react-native-linear-gradient\1;/g,
      'import { LinearGradient } from "expo-linear-gradient";',
    );

    if (patchedSource !== source) {
      fs.writeFileSync(entryPath, patchedSource);
      patchedFiles += 1;
    } else if (/from\s+(["'])expo-linear-gradient\1/.test(source)) {
      alreadyPatched = true;
    }
  }
}

patchDirectory(packagePath);

if (patchedFiles === 0 && !alreadyPatched) {
  throw new Error(
    "Could not find the react-native-linear-gradient import to configure react-native-reanimated-skeleton for Expo.",
  );
}

if (patchedFiles > 0) {
  console.log(
    `Configured react-native-reanimated-skeleton for Expo in ${patchedFiles} file(s).`,
  );
}
