import Link from "next/link";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ params }){
    const res = await fetch(process.env.VERCEL_URL + "/api/order/" + params.id)
    const rawData = await res.json()
    const a = rawData.replace('\n', '')
    console.log(a)
    const queueInfo = JSON.parse(a)
    return {
        props: {
            queueInfo,
        },
    };
}

export default function Order({ queueInfo }){
    return (
        <h2 className={styles.description}>
            <Link href="/queue/queue">
                <a>
                    Order received, go to queue!
                    Queue number: {queueInfo.number}
                </a>
            </Link>
        </h2>
    );

}