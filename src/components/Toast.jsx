import { useStore } from '../contexts/StoreContext';
import styles from './Toast.module.css';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <span className={styles.dot} />
      {toast.msg}
    </div>
  );
}
