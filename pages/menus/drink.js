import Image from 'next/image';


export function Drink({ drinkData }){
    return (
      <>
        <h1>
            {drinkData.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: drinkData.contentHtml}} />
          <Image
              priority
              src={drinkData.img}
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={drinkData.title}
          />
      </>
    );
}
