import {
  Record as $Record,
  String as $String,
  Optional as $Optional,
  Number as $Number,
  Static as $Static,
} from "runtypes";

// const BASE_URL = process.env.REACT_APP_API_URL ?? window.location.host;
const BASE_URL = window.location.hostname;

const RUN_URL = `http://${BASE_URL}:3000/run`;
const RUN_METHOD = "POST";
const RUN_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
};

const RunOutputResponse = $Record({
  stdout: $Optional($String),
  stderr: $Optional($String),
  stats: $Optional(
    $Record({
      compilation_time: $Number,
      run_time: $Number,
    })
  ),
});

export type RunOutput = $Static<typeof RunOutputResponse>;

// const mockFetch =
//   ({ error }: { error: boolean }) =>
//   () =>
//     new Response(
//       JSON.stringify(
//         error
//           ? { stats: {} }
//           : {
//               stdout: "oh, we have output",
//               stats: {
//                 time: 12000,
//                 timestamp: Date.now(),
//               },
//             }
//       )
//     );

export const runCode = (code: string): Promise<RunOutput> => {
  return (
    fetch(RUN_URL, {
      method: RUN_METHOD,
      headers: RUN_HEADERS,
      body: JSON.stringify({ code }),
    })
      // Mock the Response in a catch
      // comment the line below to make the request
      // .catch(mockFetch({ error: false }))
      .then((response) => response.json())
      .then((response) => {
        const validation = RunOutputResponse.validate(response);

        if (validation.success) {
          return RunOutputResponse.check(response);
        } else {
          throw new TypeError(JSON.stringify(validation.details, null, 2));
        }
      })
  );
};
