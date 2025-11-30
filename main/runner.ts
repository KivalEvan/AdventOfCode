import { exec } from "node:child_process";
import { promisify } from "node:util";
import { langCompile, LangName } from "./lang.ts";

const execAsync = promisify(exec);

export async function runner(
   lang: LangName,
   year: number,
   day: number,
   benchmark: number,
) {
   const needCompile = langCompile.includes(lang);

   if (needCompile) {
      console.log("Compiling...");
      console.time("compile-time");
      const cmd = await execAsync(
         "make "
            + [
               lang + "_compile",
               "YEAR=" + year,
               "DAY=" + day.toString().padStart(2, "0"),
            ].join(" "),
      );
      console.timeEnd("compile-time");

      const stderr = cmd.stderr.trim();
      if (stderr && stderr.length !== 118) {
         console.log(cmd.stdout.trim());
         console.error(stderr);
         return;
      }
   }

   if (benchmark > 1) console.log("Benchmarking...");
   else console.log("Running...");
   let stdout = "";
   let stderr = "";
   await execAsync(
      "make "
         + [
            lang,
            "YEAR=" + year,
            "DAY=" + day.toString().padStart(2, "0"),
            "ITERATION=" + benchmark.toString(),
         ].join(" "),
   ).catch((e) => e).then(({ stdout: out, stderr: err }) => {
      stdout = out;
      stderr = err;
   });

   console.log(stdout);
   const td = stderr;
   if (td.trim()) console.log(td);
}
