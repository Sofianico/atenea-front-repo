export const asyncIterator = (reader) => {
  return {
    async *[Symbol.asyncIterator]() {
      while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    },
  };
};
