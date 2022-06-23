import Link from "next/link";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ params }){
    const res = await fetch(process.env.siteUrl + "/api/order/" + params.id)
    const rawData = await res.json()
    const a = rawData.replace('\n', '')
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
                    Order received, go to queue!<br>
                    Queue number: {queueInfo.number+1}<br>
                    Vipps to 40104468
                </a>
            </Link>
        </h2>
    );

}