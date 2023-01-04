exports.handler = async ({number = 10, chunk = 1}) => {

  return paginate(number, chunk)
}

function paginate(number, chunk){
  const result = [];
  const numPages = Math.ceil(number / chunk);
  for (let i = 0; i < numPages; i++) {
    result.push({
      from: i * chunk,
      to: Math.min((i + 1) * chunk, number),
    });
  }

  return result;
}
