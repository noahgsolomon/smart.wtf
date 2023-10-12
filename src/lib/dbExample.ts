import { config } from "@/db/config";
import { connect } from "@planetscale/database";
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { something } from "@/db/schema";

export default async function getAllSomething(): Promise<Something[]> {
    const conn = connect(config);
    const db = drizzle(conn);

    const results: Something[] = await db.select({
        something: something.something,
        id: something.id
    }).from(something).execute();
    
    return results;
}