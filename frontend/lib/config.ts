export const Methods = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const JsonHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const FormDataHeader = {
  "Content-Type": "multipart/form-data",
};

export class EndPoint {
  static DEFAULT_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  /* ----------- Doctor Service -------------- */
  static REGISTER_USER = "user/signin";
  static LOGIN_USER = "user/login";
  static UPDATE_USER = "user/updateProfile";
}
