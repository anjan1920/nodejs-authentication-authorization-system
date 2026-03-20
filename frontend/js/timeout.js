// this function adds timeout to any async call (like fetch / apiRequest)
export async function withTimeout(promiseFn, timeout = 8000) {

  // controller helps us cancel request
  const controller = new AbortController();//standard way to cancel one or more asynchronous operations

  // start a timer -> if time exceeds, we cancel request
  const timer = setTimeout(() => {
    controller.abort(); // stop the request
  }, timeout);

  try {

    // call  actual function and pass signal
    const result = await promiseFn(controller.signal);

    return result;

  } catch (err) {

    // if request was aborted -> timeout case
    if (err.name === "AbortError") {
      throw new Error("TIMEOUT");
    }

    // any other error (network etc)
    throw err;

  } finally {
    clearTimeout(timer); // cleanup timer
  }
}