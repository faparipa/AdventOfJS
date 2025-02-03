import { Password } from '@/components/showpass/Password';
import styles from './showpass.module.css';

export default function ShowPasswordPage() {
  return (
    <div className={styles.container}>
      <h2>Show/Hidw Password</h2>
      <div>
        <Password />
      </div>
    </div>
  );
}
