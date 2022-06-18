import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';
import styles from "../../styles/Home.module.css";


export function drink(data){
    return (
        <a href={"/order/" + data.id} className={styles.card}>
            <h1>
                {data.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: data.contentHtml}} />
              <Image
                  priority
                  src={data.img}
                  className={utilStyles.borderCircle}
                  height={144}
                  width={144}
                  alt={data.title}
              />
      </a>
    );
}
