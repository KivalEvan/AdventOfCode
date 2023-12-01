/**
 * Return sanitised input.
 * @param path
 * @returns
 */
export function getInput(path: string): string {
   return Deno.readTextFileSync(path).replaceAll('\r', '');
}

export type Answers = {
   part1: unknown;
   part2: unknown;
   test1: unknown;
   test2: unknown;
};

/**
 * Obtain answers from `answers.txt` file.
 * @param path pass `import.url.meta`, must be in a child directory as parent directory will contain the answers file.
 * @returns {Answers} answers object
 */
export function getAnswers(path: string): Answers {
   return Deno.readTextFileSync(path)
      .replaceAll('\r', '')
      .split('\n')
      .reduce(
         (answers, value, idx) => {
            value = value.trim();
            switch (idx) {
               case 0:
                  answers.test1 = value || null;
                  break;
               case 1:
                  answers.part1 = value || null;
                  break;
               case 2:
                  answers.test2 = value || null;
                  break;
               case 3:
                  answers.part2 = value || null;
                  break;
            }
            return answers;
         },
         {
            part1: null,
            part2: null,
            test1: null,
            test2: null,
         } as Answers
      );
}
