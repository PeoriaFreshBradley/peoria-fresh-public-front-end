//Returns true if password meets requirements
//(8 char, contains num & special), else returns false
const isValidPassword = (password: string) => {
    // at least 8 chars
    if (password.length < 8) return false;
    // contain a number
    if (!/[0-9]/.test(password)) return false;
    // contain a special character
    if (!/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)) return false;
    return true;
  };

export default isValidPassword;