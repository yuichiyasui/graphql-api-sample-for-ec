import Image from 'next/image';

import { AllItemsDocument } from '~/graphql/generated/graphql';
import { graphqlRequestClient } from '~/libs/graphql-request';

const ItemList = async () => {
  const { items } = await graphqlRequestClient.request(AllItemsDocument);

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item) => {
        return (
          <li key={item.id}>
            <div>
              <Image
                width="150"
                height="150"
                src={item.mainImageUrl}
                alt=""
                unoptimized
                className="mb-2 w-full h-auto"
              />
              <p className="font-bold">{item.name}</p>
              <p className="text-sm">{item.displayPrice}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default async function Page() {
  return (
    <div className="my-4">
      <section className="mx-4">
        <h2 className="font-bold text-lg mb-4">商品一覧</h2>
        {/* @ts-expect-error Server Component */}
        <ItemList />
      </section>
    </div>
  );
}
