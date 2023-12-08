import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/user.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Signin = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token)
            navigate('/');
    }, []);

    const checkEmail = () => {
        if (email === '')
            setEmailError('Email is required');
        else
            setEmailError('');
    };

    const checkPassword = () => {
        // Reset the error message
        setPasswordError('');

        // Define your password strength criteria
        const minLength = 8;

        // Check password length
        if (password.length < minLength) {
            setPasswordError('Password must be at least 8 characters long.');
            return;
        }

        // Check for uppercase letters
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter.');
            return;
        }

        // Check for lowercase letters
        const lowercaseRegex = /[a-z]/;
        if (!lowercaseRegex.test(password)) {
            setPasswordError('Password must contain at least one lowercase letter.');
            return;
        }

        // Check for numbers
        const numbersRegex = /\d/;
        if (!numbersRegex.test(password)) {
            setPasswordError('Password must contain at least one number.');
            return;
        }

        // Check for special characters
        const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        if (!specialCharsRegex.test(password)) {
            setPasswordError('Password must contain at least one special character.');
            return;
        }

        // check for sql injection
        const sqlRegex = /(['"])((?:\\\1|.)*?)\1|[-;'"()|&;`%]/i;
        if (sqlRegex.test(password)) {
            setPasswordError('Password must not contain any special characters.');
            return;
        }

        // Password meets all criteria
        setPasswordError('');
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        checkEmail();
        checkPassword();
        try {
            // const res = await axios.post(ServerURL + '/api/user/signin', {
            //     email: email.trim(),
            //     password: password.trim()
            // });
            // const { user, token } = res.data;
            const user = {
                name: 'Habib Bibani',
                email,
                password
            };
            dispatch(login({ user, token:'qsd' }));
            navigate('/');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    useEffect(() => {
        setEmailError('');
    }, [email]);

    useEffect(() => {
        setPasswordError('');
    }, [password]);

    return (
        <form onSubmit={onSubmit}>
            <div
                className="w-full h-screen bg-gradient-to-br from-sky-900 via-sky-600 to-sky-900 flex justify-center items-center">
                <div
                    className="px-[50px] pt-[50px] pb-[20px] w-fit bg-light rounded-xl ">
                    <div className="flex flex-col gap-[40px] justify-center items-center">
                        <h1 className="text-3xl font-bold text-dark">User Login</h1>
                        <div className="flex flex-col gap-[30px]">
                            <div>
                                <input
                                    className={`border ${emailError ? 'border-danger placeholder-danger outline-danger' : 'border-dark' } rounded-md w-[260px] p-2 bg-light`} type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="absolute text-red-500 text-left text-sm font-thin">{emailError}</div>
                            </div>
                            <div>
                                <input className={`border ${passwordError ? 'border-danger placeholder-danger outline-danger' : 'border-dark' } rounded-md w-[260px] p-2 bg-light`} type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute text-red-500 text-left text-sm font-thin">{passwordError}</div>

                            </div>
                        </div>
                        <button type="submit"
                            className="bg-primary px-[40px] py-[10px] rounded-xl text-2xl text-white hover:bg-secondary cursor-pointer">
                        Login
                        </button>
                    </div>
                    {error && <div className="text-red-500 text-center mt-5">{error}</div>}
                </div>

            </div>
        </form>

    );
};

export default Signin;