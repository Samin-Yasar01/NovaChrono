'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/lib/cookie-utils';
import { validateApiKey } from '@/actions/auth/service';
import { Lock, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Validate key via Server Action
            const isValid = await validateApiKey(apiKey);

            if (!isValid) {
                throw new Error('Invalid API Key');
            }

            // If success, save it and redirect
            setCookie('nova_admin_api_key', apiKey);
            router.push('/admin/dashboard');
        } catch (err: any) {
            console.error(err);
            setError('Invalid API Key or Server Error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-950 px-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Admin Access
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Enter your API Key to access the dashboard
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="apiKey" className="sr-only">
                            API Key
                        </label>
                        <input
                            id="apiKey"
                            name="apiKey"
                            type="password"
                            required
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="relative block w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
                            placeholder="Enter Admin API Key"
                        />
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400 text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                Sign In
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
