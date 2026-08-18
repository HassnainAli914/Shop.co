const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const filePath = path.join(process.cwd(), "data", "users.json");

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          return resolve([]);
        }
        reject(err);
      } else {
        try {
          const str = data.toString().trim();
          resolve(str ? JSON.parse(str) : []);
        } catch (e) {
          resolve([]);
        }
      }
    });
  });
};

const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.createUser = async (email, password, uid) => {
  try {
    const users = await readData();
    const matched = users.find((user) => user.email === email);
    if (!!matched) {
      throw new Error("User Already Exists");
    } else {
      const hashedPass = await bcrypt.hash(password, 12);
      await writeData([...users, { email, password: hashedPass, uid }]);
    }
  } catch (error) {
    throw error;
  }
};

exports.findUser = async (email) => {
  try {
    const users = await readData();
    const matched = users.find((user) => user.email === email);
    return matched;
  } catch (error) {
    throw error;
  }
};
