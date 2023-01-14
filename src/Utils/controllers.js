export const updateItem = (item, current) => {
  let index = current.findIndex(
    (record) => record.questionNum === item.questionNum
  );
  current[index] = item;
  return current;
};
