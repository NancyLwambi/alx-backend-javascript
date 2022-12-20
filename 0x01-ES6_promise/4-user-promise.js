// returns a resolved promise
export default function signUpUser(firstName, lastName) {
  return Promise.resolve({
    firstName,
    lastName,
  });
}
