import SignUpImage from '../Assets/signup.svg';
import classes from '../styles/Illustration.module.css';

export default function Illustration() {
    return (
        <div className={classes.illustration}>
            <img src={SignUpImage} alt="Signup" />
        </div>
    );
};