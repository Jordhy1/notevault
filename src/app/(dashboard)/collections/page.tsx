import { getCollections } from "@/features/collections/queries";
import { CollectionManager } from "@/components/collections/collection-manager";
export default async function CollectionsPage() { const collections = await getCollections(); return <><h1 className="text-3xl font-bold">Collections</h1><div className="mt-8"><CollectionManager initialCollections={collections} /></div></>;
}
