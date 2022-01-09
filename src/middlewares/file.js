const { join } = require("path");
const { createWriteStream, unlink } = require("fs");
const { v4: UUID } = require("uuid");

module.exports.singleFileUpload = async (file) => {
  const { createReadStream, mimetype } = await file;
  const stream = createReadStream();
  const name = `${mimetype.split("/")[0]}__${UUID()}.${mimetype.split("/")[1]}`;
  const url = join(__dirname, "../upload", name);
  const imageStream = await createWriteStream(url);
  await stream.pipe(imageStream);

  return name;
};

module.exports.multipleFileUpload = async (file) => {
  let fileUrl = [];

  for (let i = 0; i < file.length; i++) {
    const { createReadStream, mimetype } = await file[i];
    const stream = createReadStream();
    const name = `${mimetype.split("/")[0]}__${UUID()}.${
      mimetype.split("/")[1]
    }`;
    const url = join(__dirname, "../upload", name);
    const imageStream = await createWriteStream(url);
    await stream.pipe(imageStream);

    fileUrl.push(name);
  }

  return fileUrl;
};

module.exports.deleteFile = (file) => {
  if (file === null) {
    return;
  } else if (typeof file === "object") {
    file.forEach((element) => {
      unlink(join(__dirname, "../upload", element), (er) => {
        console.log(er);
      });
    });
  } else {
    unlink(join(__dirname, "../upload", file), (er) => {
      console.log(er);
    });
  }
};
