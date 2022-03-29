import bcrypt from "bcryptjs";
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const passHashed = await bcrypt.hash(password, salt);
  return passHashed;
};

export const comparePassword = async (providedPass: string, storedPass: string) => {
  const isValid = await bcrypt.compare(providedPass, storedPass);
  return isValid;
};


