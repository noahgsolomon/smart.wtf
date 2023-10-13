
import { appRouter } from '@/app/server';
import { createContext, createContextInner } from '@/app/server/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

const handler = async (req: NextRequest) => {
    const response = await fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => (createContext(req)),
    });
    return response;
}

export { handler as GET, handler as POST}