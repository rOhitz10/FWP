import { object, string, number, date, InferType, ref } from 'yup';

export const signUpSchema = Yup.object({
    name: string().min(2).max(25).required("Please enter your name"),
    email: string().email().required("Please enter your email"),
    password: string().min(6).required("Please enter your password"),
    confirm_password: string().required().oneOf([ref("password"), null], "Password must match"),
});

