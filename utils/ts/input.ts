export type Answers = {
   part1: string;
   part2: string;
   test1: string;
   test2: string;
};

/**
 * Return sanitised input and removes redundant line break at the end.
 * @param path
 * @returns
 */
export function getInput(path: string): string {
   return Deno.readTextFileSync(path).replaceAll('\r', '').replace(/\n$/, '');
}

/**
 * Obtain answers from `answers.txt` file.
 * @param path pass `import.url.meta`, must be in a child directory as parent directory will contain the answers file.
 * @returns {Answers} answers object
 */
export function getAnswers(path: string): Answers {
   return getInput(path)
      .split('\n')
      .reduce(
         (answers, value, idx) => {
            value = value.trim();
            switch (idx) {
               case 0:
                  answers.test1 = value;
                  break;
               case 1:
                  answers.part1 = value;
                  break;
               case 2:
                  answers.test2 = value;
                  break;
               case 3:
                  answers.part2 = value;
                  break;
            }
            return answers;
         },
         {
            part1: '',
            part2: '',
            test1: '',
            test2: '',
         } satisfies Answers
      );
}
