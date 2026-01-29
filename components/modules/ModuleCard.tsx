'use client';
import Link from 'next/link';

export default function ModuleCard({ module }) {
    const isReady = module.category && (module.category.startsWith('[') || module.category.startsWith('{'));

    return (
        <div className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-slate-800">{module.title_en}</h3>
            <p className="text-sm font-medium text-blue-600 mb-4">Advanced Technical Track</p>
            <div className="flex items-center justify-between border-t pt-4">
                <span className="text-xs text-gray-400">191 Engine Nodes Ready</span>
                <Link href={`/diagnostic/${module.id}`}>
                    <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700">
                        Open Diagnostic
                    </button>
                </Link>
            </div>
        </div>
    );
}