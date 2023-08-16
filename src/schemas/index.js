import * as yup from "yup";

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
export const bvnPattern="[0-9]{11}"
//min 5 characters, 1 upper case latter, 1 lower case letter, 1 numeric digit

