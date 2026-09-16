import { getTags } from "@/features/tags/queries";
import { TagManager } from "@/components/tags/tag-manager";
export default async function TagsPage() { const tags = await getTags(); return <><h1 className="text-3xl font-bold">Tags</h1><div className="mt-8"><TagManager initialTags={tags} /></div></>;
}
