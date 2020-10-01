import * as config from "../../../configuration";
import download from "download";
import ls from "log-symbols";
import fs from "fs-extra";
import YAML from "yaml";
import exec from "../../helpers/cp-execpromise";
import cp from "child_process";

async function Lavalink() {
  if (!config.iLavaLink.enabled) {
    return;
  }
  try {
    await exec("java -version");
    console.log(ls.success, "Java is installed. Audio module will be loaded.");
  } catch (err) {
    return console.log(
      ls.error,
      "Java is not installed, audio module deactivated."
    );
  }
  await fs.ensureDir("lavalink");
  try {
    await fs.stat("lavalink/Lavalink.jar");
  } catch (err) {
    console.log(ls.error, "Integrated lavalink does not exist, downloading...");
    await download(
      "https://github.com/Frederikam/Lavalink/releases/download/3.3.1.3/Lavalink.jar",
      "lavalink"
    );
    console.log(ls.success, "Lavalink downloaded");
  }
  await fs.writeFile(
    "./lavalink/application.yml",
    YAML.stringify(config.advancedLavaLinkOptions)
  );
  cp.spawn("java", ["-jar", "Lavalink.jar"], {
    cwd: "lavalink",
  });
}

Lavalink();
