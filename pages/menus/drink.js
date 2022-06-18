import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';
import styles from "../../styles/Home.module.css";
import Link from "next/link";


export function Drink(data){
    return (
        <Link href={"/order/" + data.id}>
            <a className={styles.card}>
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
        </Link>
    );
}

export function DrinkNoLink(data){
    return (
        <main className={styles.card}>
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
        </main>
    );
}



export function DrinkRemove(data){
    return (
        <button className={styles.card} onClick={() => {
            fetch("http://localhost:3000/api/queue/" + data.id);
            window.location.reload()
        }}>
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
        </button>
    );
}
