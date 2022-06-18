import styles from "../../styles/Home.module.css";
import utilStyles from '../../styles/utils.module.css';
import Link from "next/link";
import {drink} from "./drink";
import Image from 'next/image';

//
// export function drink(data){
//     console.log(data)
//     return (
//         <>
//             <h1>
//                 {data.title}
//             </h1>
//             <div dangerouslySetInnerHTML={{ __html: data.contentHtml}} />
//             <Image
//                 priority
//                 src={data.img}
//                 className={utilStyles.borderCircle}
//                 height={144}
//                 width={144}
//                 alt={data.title}
//             />
//         </>
//     );
// }


export async function getServerSideProps(context) {
    const res = await fetch("http://localhost:3000/api/drinks/gin_drink_temp")
    const rawData = await res.json()
    const a = rawData.replace('\n', '')
    const data = JSON.parse(a)
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default function GinDrinks({ data }) {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Gin drinks...</h1>

                <div className={styles.grid}>
                    <a href="/menus/gin_drinks" className={styles.card}>
                        <>{drink(data)}</>
                    </a>

                    <a href="/menus/whisky_drinks" className={styles.card}>
                        <h2>Whisky drinks &rarr;</h2>
                        <p>Taste our whisky sours, Brown derby&apos;s and more!</p>
                    </a>
                </div>
                <h2 className={styles.description}>
                    <Link href="/">
                        <a>Back to orders</a>
                    </Link>
                </h2>
            </main>
        </div>
    );
}
